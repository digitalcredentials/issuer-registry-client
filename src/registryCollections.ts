import { RegistryCollection } from './lib';
import { IssuerDidEntry } from './types';

import registryCollectionsConfig from './config/registryCollections.json';

export const registryCollections = {
  issuerDid: new RegistryCollection<IssuerDidEntry>(registryCollectionsConfig.issuerDid),
};

export async function loadRegistryCollections(): Promise<void> {
  await Promise.all(Object.values(registryCollections).map(async (collection) => 
    collection.fetchRegistries()
  ));
} 
