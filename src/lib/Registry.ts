/*!
 * Copyright (c) 2022 Digital Credentials Consortium. All rights reserved.
 */

import { RegistryRaw } from '../types';

export class Registry<Entry> implements RegistryRaw<Entry> {
  entries;
  meta;
  name;

  constructor(registry: RegistryRaw<Entry>) {
    this.entries = registry.entries;
    this.meta = registry.meta;
    this.name = registry.name;
  }

  public isInRegistry(issuerKey: string): boolean {
    return issuerKey in this.entries;
  }

  public entryFor(issuerKey: string): Entry {
    if (!this.isInRegistry(issuerKey)) {
      throw new Error(`${issuerKey} not found in registry.`);
    }

    return this.entries[issuerKey];
  }
}

