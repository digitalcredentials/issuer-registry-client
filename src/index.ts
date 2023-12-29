/*!
 * Copyright (c) 2022 Digital Credentials Consortium. All rights reserved.
 */
import 'isomorphic-fetch';

export async function loadRegistries (config: any): Promise<any> {
  return { result: true }
}

export { Registry } from './lib';
export { registryCollections, loadRegistryCollections } from './registryCollections';
export * from './types';
