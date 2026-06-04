import { test, expect } from '@playwright/test'

// Smoke spec: prove the bundle loads in a real browser and the core
// RegistryClient API is constructable and callable. Network paths are
// covered by the Node (vitest + nock) suite.
test('RegistryClient loads and instantiates in the browser', async ({
  page
}) => {
  await page.goto('/test/index.html')

  const result = await page.evaluate(async () => {
    const { RegistryClient } = await import('/src/index.ts')
    const client = new RegistryClient()
    client.use({ registries: [] })
    return {
      isInstance: client instanceof RegistryClient,
      hasLookup: typeof client.lookupIssuersFor === 'function'
    }
  })

  expect(result.isInstance).toBe(true)
  expect(result.hasLookup).toBe(true)
})
