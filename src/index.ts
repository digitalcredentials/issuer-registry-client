import { jwtDecode } from "jwt-decode";

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
 *   "checked": false
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
 *   url: "https://digitalcredentials.mit.edu",
 *   inRegistries: ["DCC Community Registry", "DCC Sandbox Registry"]
 * }
 * ```
 */
export interface IssuerMetaData {
  name: string
  url: string
  legalName: string
  location: string
  inRegistries: string[]
}

export interface IssuerMatch {
  issuer: IssuerMetaData | null
  registry: Registry
}

export interface LookupResult {
  matchingIssuers: IssuerMatch[]
  uncheckedRegistries: Registry[]
}

const DID_MAP_REGISTRY_SPEC_V01 = '2.0.0'

export class RegistryClient {
  #registries: Registry[]
  /**
   *
   * @param registries - an array of registries to load
   */

  // 'registries' will likely have been gotten with: fetch("https://github.com/digitalcredentials/known-registries/list.json");

  use({ registries }: { registries: any }): void {
    this.#registries = registries
  }

  async lookupIssuersFor(did: string): Promise<LookupResult> {
    // loop over all the registries, looking up the DID in each registry:
    const allRegistryLookups = await Promise.all(
      this.#registries.map(async registry => {
        //registry.checked = false
        let issuer
        if (registry.type === 'oidf') {
          try {
            const response = await fetch(registry.fetchEndpoint + did)
            if (response.status === 404) {
              console.log('no DID found in oidf regsitry')
            } else {
              const jwtToken = await response.text()
              const decodedJWT = jwtDecode(jwtToken) as any;
              issuer = decodedJWT.metadata
            }
          } catch (e) {
            console.log(`error calling oidf endpoint: ${registry.fetchEndpoint}`)
            console.log(e)
            registry.unchecked = true
          }
          // maybe validate the JWT?
          // likely transform the returned oidf entity statement into some simpler common form
        } else if (registry.type === 'dcc-legacy') {
          try {
            const response = await fetch(registry.url as string)
            const listOfIssuersByDID = await response.json()
            issuer = listOfIssuersByDID.registry[did]
          } catch (e) {
            console.log(`error retrieving registry from endpoint: ${registry.fetchEndpoint}`)
            console.log(e)
            registry.unchecked = true
          }
        }
        return { issuer, registry }
      })
    )
    const uncheckedRegistries = allRegistryLookups.filter(lookup => lookup.registry.unchecked).map(lookup => {delete lookup.registry.unchecked; return lookup.registry})
    const matchingIssuers = allRegistryLookups.filter(lookup => lookup.issuer)
    return { matchingIssuers, uncheckedRegistries }
  }

  constructor() {
    this.#registries = []
  }
}
