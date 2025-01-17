/*!
 * Copyright (c) 2023 Digital Credentials Consortium. All rights reserved.
 */
import { httpClient } from '@digitalcredentials/http-client'

/**
 * Example registry:
 * @example
 * ```
 * {
 *   "name": "DCC Sandbox Registry",
 *   "url": "https://digitalcredentials.github.io/sandbox-registry/registry.json"
 * }
 * ```
 */
export class KnownDidRegistry {
  public name: string
  public url: string

  constructor (name: string, url: string) {
    this.name = name
    this.url = url
  }
}

const DID_MAP_REGISTRY_SPEC_V01 = '0.1.0'

export class DidMapRegistry extends KnownDidRegistry {
  public version: string = DID_MAP_REGISTRY_SPEC_V01

  /**
   * @example rawContents
   * {
   *   did:key:z6MkpLDL3RoAoMRTwTgo3rs39ZwssfaPKtGdZw7AGRN7CK4W: {
   *     name: "(Example) My University",
   *     location: "Cambridge, MA, USA",
   *     url: "https://digitalcredentials.mit.edu"
   *   }
   * }
   */
  public rawContents?: any

  constructor ({ name, url, rawContents }: { name: string, url: string, rawContents: any[] }) {
    super(name, url)
    this.rawContents = rawContents
  }
}

/**
 * @example
 * ```
 * // did:key:z6MkpLDL3RoAoMRTwTgo3rs39ZwssfaPKtGdZw7AGRN7CK4W
 * {
 *   name: "(Example) My University",
 *   location: "Cambridge, MA, USA",
 *   url: "https://digitalcredentials.mit.edu",
 *   inRegistries: ["DCC Community Registry", "DCC Sandbox Registry"]
 * }
 * ```
 */
export class DidMapRegistryEntry {
  public name: string
  public url: string
  public location?: string
  inRegistries?: Set<KnownDidRegistry> = new Set()

  constructor ({ name, url, location }: { name: string, url: string, location: string }) {
    this.name = name
    this.url = url
    this.location = location
  }
}

export interface LoadResult {
  name: string
  url: string
  loaded: boolean
  error?: any
}

export class RegistryClient {
  public registries?: DidMapRegistry[]
  public didMap: Map<string, DidMapRegistryEntry> = new Map()

  /**
   * @example
   * ```
   * const config = [
   *   {
   *     "name": "DCC Sandbox Registry",
   *     "url": "https://digitalcredentials.github.io/sandbox-registry/registry.json"
   *   }
   * ]
   * const client = new RegistryClient()
   * await client.load({ config })
   * ```
   * @param registries - Config object with a list of registries to load
   */
  async load ({ config }: { config: any }): Promise<LoadResult[]> {
    // Clear previous DID map and entries
    this.didMap = new Map()
    this.registries = config as DidMapRegistry[]
    const registryLoadResult = JSON.parse(JSON.stringify(this.registries)) as LoadResult[]
    await Promise.all(this.registries.map(async (registry) => {
      const resultEntry = registryLoadResult.find((entry: LoadResult) => entry.url === registry.url)
      try {
        // fetch registry contents
        const contents: any = await httpClient.get(registry.url)
        registry.rawContents = contents.data.registry
        // discard contents.meta, not needed at this point

        // cycle through each DID in the registry, add to DID Map
        for (const did in registry.rawContents) {
          const entry = new DidMapRegistryEntry(registry.rawContents[did])
          const existingEntry = this.didMap.get(did)
          if (existingEntry != null) {
            existingEntry.inRegistries?.add(registry)
          } else {
            entry.inRegistries?.add(registry)
            this.didMap.set(did, entry)
          }
        }
        if (resultEntry != null) resultEntry.loaded = true
      } catch (e) {
        console.log(`Could not load registry from url "${registry.url}":`, e)
        // no DIDs are added from that registry
        if (resultEntry != null) resultEntry.loaded = false
        if (resultEntry != null) resultEntry.error = e
      }
    }))
    return registryLoadResult
  }

  didEntry (did: string): DidMapRegistryEntry | undefined {
    return this.didMap.get(did)
  }
}
