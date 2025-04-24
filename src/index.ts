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
  fetchEndpoint?: string,
  checked?: boolean
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
  issuer: IssuerMetaData | null,
  registry: Registry
}

export interface LookupResult {
  matchingIssuers: IssuerMatch[],
  uncheckedRegistries: Registry[]
}

const DID_MAP_REGISTRY_SPEC_V01 = '2.0.0'

export class RegistryClient {
  private registries: Registry[]
  /**
   * 
   * @param registries - an array of registries to load
   */

  // 'registries' will likely have been gotten with: fetch("https://github.com/digitalcredentials/known-registries/list.json");

  use({ registries }: { registries: any }): void {
    this.registries = registries
  }


  async lookupIssuersFor(did: string): Promise<LookupResult> {
    // loop over all the registries, looking up the DID in each registry:
    const allRegistryLookups = await Promise.all(
      this.registries.map(async registry => {
        registry.checked = false;
        let issuer;
        if (registry.type === 'oidf') {
          try {
            const response = await fetch(registry.fetchEndpoint + did);
            issuer = await response.json();
            registry.checked = true;
          } catch (e) {
            console.log(`error calling oidf endpoint: ${registry.fetchEndpoint}`)
            console.log(e)
          }
          // maybe validate the JWT?
          // likely transform the returned oidf entity statement into some simpler common form
        } else if (registry.type === 'dcc-legacy') {
          try {
            const response = await fetch(registry.url as string);
            const listOfIssuersByDID = await response.json();
            issuer = listOfIssuersByDID.registry[did];
            registry.checked = true;
          } catch (e) {
            console.log(`error retrieving registry from endpoint: ${registry.fetchEndpoint}`)
            console.log(e)
          }

        }
        return { issuer, registry }
      })
    )
    const matchingIssuers = allRegistryLookups.filter(lookup => lookup.issuer)
    const uncheckedRegistries = allRegistryLookups.filter(lookup => !lookup.registry.checked).map(lookup => lookup.registry)
    return { matchingIssuers, uncheckedRegistries }
  }
}
