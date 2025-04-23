/*!
 * Copyright (c) 2023 Digital Credentials Consortium. All rights reserved.
 */


/**
 * Example registry entry:
 * @example
 * ```
 * {
 *   "type": "dcc-legacy",
 *   "name": "DCC Sandbox Registry",
 *   "url": "https://digitalcredentials.github.io/sandbox-registry/registry.json"
 * }
 * ```
 */
export interface Registry {
  type: 'oidf' | 'dcc-legacy'
  name: string
  url?: string
  fetchEndpoint?: string
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
  issuer: IssuerMetaData,
  registry: Registry
}

const DID_MAP_REGISTRY_SPEC_V01 = '2.0.0'

export class RegistryClient {
  private registries: Registry[]
  /**
   * 
   * @param registries - an array of registries to load
   */
   use ({ registries }: { registries: any }): void {
    this.registries = registries
    }
  

  async lookupIssuersFor (did: string): Promise<IssuerMatch[] | undefined> {
      // this next fetch will be called by whoever calls this issuer-registry-client, and the result passed in on the
  // 'use' method.
//	const listOfKnownRegistries = fetch("https://github.com/digitalcredentials/known-registries/list.json");
	// loop over all the registries, looking up the DID in each registry:
	const matchingIssuers = await Promise.all(
    // TODO: could use an accumulator here to filter out null entries.
		this.registries.map( async registry => {
      let issuer;
			if (registry.type === 'oidf') {
        // e.g., https://registry.dcconsortium.org/fetch?sub=
				const response = await fetch(registry.fetchEndpoint + did)
				issuer = await response.json();
				// maybe validate the JWT?
				// likely transform the returned oidf entity statement into some simpler common form
			} else if (registry.type === 'dcc-legacy') {
				const response = await fetch(registry.url as string)
				const listOfIssuersByDID = await response.json();
				issuer = listOfIssuersByDID.registry[did]
			}
      return {issuer, registry}
		})
	)
  // need to filter out nulls in this list:
	return matchingIssuers
  }
}
