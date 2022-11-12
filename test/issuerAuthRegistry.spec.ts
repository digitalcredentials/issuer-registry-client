import { expect } from 'chai'
import { generateIssuerAuthRegistry } from '../src'

describe('generateIssuerAuthRegistry()', () => {
  it('returns registry with metadata', () => {
    const issuerAuthRegistry = generateIssuerAuthRegistry({ platform: 'ios' });

    expect(issuerAuthRegistry.meta.created).to.be.a('string');
    expect(issuerAuthRegistry.meta.updated).to.be.a('string');
  })

  it('returns registry containing an entry', () => {
    const issuerAuthRegistry = generateIssuerAuthRegistry({ platform: 'ios' });
    const registryEntries = Object.entries(issuerAuthRegistry.entries);

    expect(registryEntries.length).to.be.greaterThan(0);
  })
})
