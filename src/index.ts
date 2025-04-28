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
  fetchEndpoint?: string
  unchecked?: boolean
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

interface RegistryResult {
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

  // 'registries' will likely have been gotten with: fetch("https://github.com/digitalcredentials/known-registries/list.json");

  use ({ registries }: { registries: any }): void {
    this.#registries = registries
  }

  async lookupIssuersFor (did: string): Promise<LookupResult> {
    // loop over all the registries, looking up the DID in each registry:
    const allRegistryLookups = await Promise.all(
      this.#registries.map(async (registry: Registry) => {
        // registry.checked = false
        let issuer
        if (registry.type === 'oidf') {
          try {
            const response = await fetch(`${registry.fetchEndpoint as string}${did}`)
            if (response.status !== 404) {
              const jwtToken = await response.text()
              const decodedJWT: { metadata: any } = jwtDecode(jwtToken)
              issuer = decodedJWT.metadata
            }
          } catch (e) {
            console.log(`error calling oidf endpoint: ${registry.fetchEndpoint as string}`)
            console.log(e)
            registry.unchecked = true
          }
          // maybe validate the JWT?
          // likely transform the returned oidf entity statement into some simpler common form
        } else if (registry.type === 'dcc-legacy') {
          try {
            const response = await fetch(registry.url as string)
            const listOfIssuersByDID = await response.json() as RegistryResult
            const entry = listOfIssuersByDID.registry[did]
            if (typeof entry !== 'undefined' && entry !== null) {
              issuer = {
                federation_entity: {
                  organization_name: entry.name,
                  homepage_uri: entry.url,
                  location: entry.location
                }
              }
            }
          } catch (e) {
            console.log(`error retrieving registry from endpoint: ${registry.fetchEndpoint as string}`)
            console.log(e)
            registry.unchecked = true
          }
        }
        return { issuer, registry }
      })
    )
    const uncheckedRegistries = allRegistryLookups.filter(lookup => lookup.registry.unchecked).map(lookup => { delete lookup.registry.unchecked; return lookup.registry })
    const matchingIssuers = allRegistryLookups.filter(lookup => lookup.issuer)
    return { matchingIssuers, uncheckedRegistries }
  }

  constructor () {
    this.#registries = []
  }
}
