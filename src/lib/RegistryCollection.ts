import { RemoteRegistryConfig } from '../types/registry';
import { Registry } from './Registry';

export class RegistryCollection<Entry> {
  configs: RemoteRegistryConfig[];
  registries: Array<Registry<Entry>> = [];

  constructor(configs: RemoteRegistryConfig[]) {
    this.configs = configs;
  }

  public async fetchRegistries(): Promise<void> {
    const allRegistries = await Promise.all(this.configs.map(async ({ url, name }) => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Received ${response.status} from ${url}`);

        const data = await response.json();
        return new Registry<Entry>({
          meta: data.meta,
          entries: data.registry,
          name,
        });
      } catch (err) {
        console.log(`Could not fetch registry "${name}" at ${url}`);
      }
    }));

    this.registries = allRegistries.filter(Boolean) as Array<Registry<Entry>>;
  }

  public isInRegistryCollection(key: string): boolean {
    return this.registries.some(registry => registry.isInRegistry(key));
  }

  public registriesFor(key: string): Array<Registry<Entry>> {
    return this.registries.filter(registry => registry.isInRegistry(key));
  }
}
