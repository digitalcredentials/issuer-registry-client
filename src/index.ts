import { jwtDecode } from 'jwt-decode'

/*!
 * Copyright (c) 2025 Digital Credentials Consortium. All rights reserved.
 */

/**
 * Example registry entry:
 * @example
 * ```
 * {
 *   "type": "dcc-legacy",
 *   "name": "DCC Sandbox Registry",
 *   "url": "https://digitalcredentials.github.io/sandbox-registry/registry.json",
 *   "unchecked": true
 * }
 * ```
 */
export interface Registry {
  type: 'oidf' | 'dcc-legacy'
  name: string
  url?: string
  trustAnchorEC?: string
}

/**
 * Example issuer metadata:
 * @example
 * ```
 * {
 *   name: "(Example) My University",
 *   location: "Cambridge, MA, USA",
 *   legalName: "The righteous regal institute of reality"
 *   url: "https://digitalcredentials.mit.edu"
 * }
 * ```
 */
export interface IssuerMetaData {
  name: string
  url: string
  legalName?: string
  location: string
}

interface LegacyRegistryResult {
  registry: { [key: string]: IssuerMetaData }
}

export interface IssuerMatch {
  issuer: IssuerMetaData | null
  registry: Registry
}

export interface LookupResult {
  matchingIssuers: IssuerMatch[]
  uncheckedRegistries: Registry[]
}

export class RegistryClient {
  #registries: Registry[]
  /**
   *
   * @param registries - an array of registries to load
   */

  // see fetch("https://github.com/digitalcredentials/known-registries/list.json") for an example of 'registries'

  use ({ registries }: { registries: any }): void {
    this.#registries = registries
  }

  async lookupIssuersFor (did: string): Promise<LookupResult> {
    // loop over all the registries, looking up the DID in each registry:
    const allRegistryLookups = await Promise.all(
      this.#registries.map(async (registryEntry: Registry) => {
        let issuer
        let registry
        let unchecked
        if (registryEntry.type === 'oidf') {
          try {
            const ecResponse = await fetch(`${registryEntry.trustAnchorEC as string}`)
            const entityConfigJWT = await ecResponse.text()
            const entityConfig: { metadata: any } = jwtDecode(entityConfigJWT)
            const registryMetadata = entityConfig.metadata
            const lookupResponse = await fetch(`${registryMetadata.federation_entity.federation_fetch_endpoint as string}?sub=${did}`)
            if (lookupResponse.status === 200) {
              const issuerResultJWT = await lookupResponse.text()
              const issuerResults: { metadata: any } = jwtDecode(issuerResultJWT)
              issuer = issuerResults.metadata
              registry = registryMetadata;
            } else if (lookupResponse.status === 404) {
              // did wasn't found, so do nothing - simply leave the issuer empty, which
              // we'll later filter out of the results
            } else {
              // couldn't check the registry for some reason so return as unchecked
              unchecked = registryEntry
            }
          } catch (e) {
            console.log(`error accessing oidf registry: ${registryEntry.trustAnchorEC as string}`)
            console.log(e)
            // couldn't check the registry for some reason so return as unchecked
            unchecked = registryEntry
          }
          // TODO: could validate the JWT

        } else if (registryEntry.type === 'dcc-legacy') {
          try {
            const response = await fetch(registryEntry.url as string)
            const listOfIssuersByDID = await response.json() as LegacyRegistryResult
            const matchingIssuer = listOfIssuersByDID.registry[did]
            if (typeof matchingIssuer !== 'undefined' && matchingIssuer !== null) {
              issuer = {
                federation_entity: {
                  organization_name: matchingIssuer.name,
                  homepage_uri: matchingIssuer.url,
                  location: matchingIssuer.location
                }
              };
              registry = {
                type: "dcc-legacy",
                federation_entity: {
                    organization_name: registryEntry.name
                },
                institution_additional_information: {
                    "legacy_list": registryEntry.url
                }
              };
            }
          } catch (e) {
            console.log(`error retrieving registry from endpoint: ${registryEntry.url as string}`)
            console.log(e)
            unchecked = registryEntry
          }
        }
        return { issuer, registry, unchecked}
      })
    )
    // pull out any results where we couldn't check the registry
    const uncheckedRegistries = allRegistryLookups
      .filter(lookup => typeof lookup.unchecked !== 'undefined' )
      .map(lookup => {return lookup.unchecked}) as Registry[]
    // only return a match for a lookup when there is a value for 'issuer':
    const matchingIssuers = allRegistryLookups
      .filter(lookup => lookup.issuer)
      .map(lookup => {return {issuer: lookup.issuer, registry: lookup.registry}})
    return { matchingIssuers, uncheckedRegistries }
  }

  constructor () {
    this.#registries = []
  }
}
