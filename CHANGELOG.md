# `@digitalcredentials/issuer-registry-client` Changelog

## 4.1.0 - 2026-08-31

### Added

- `new RegistryClient({ fetch })` -- an optional injectable `fetch` that every
  registry request goes through, defaulting to `globalThis.fetch`. Lets a caller
  apply its own timeouts, headers, caching, instrumentation, or test doubles,
  and lets one whose runtime cannot reach a registry host directly (a browser,
  where not every registry sends CORS headers) route requests through a proxy or
  gateway of its own.

## 4.0.0 - 2026-06-05

### Changed

- Infrastructure migrated to the `isomorphic-lib-template` toolchain (no changes
  to library behavior or public API): pnpm, single `tsc` build with consolidated
  `tsconfig.json` + `tsconfig.dev.json`, ESLint flat config + Prettier 3, Vitest
  for Node tests, Playwright for browser tests, and updated CI/publish
  workflows. Node.js engine floor raised to `>=24`.
- Remove unused `http-client` dependency.

## 3.1.0 - 2025-02-09

### Changed

- `client.load(config)` now returns a result (whereas it previously returned
  null) showing which registries loaded sucessfully and which didn't. This
  allows clients to provide end users with more information (i.e, a registry
  couldn't be checked) if they want to.

## 3.0.0 - 2024-08-05

### Changed

- **BREAKING**: Update to latest `@digitalcredentials/http-client@5.0.2`

## 2.0.0 - 2024-01-3

### Changed

- **BREAKING**: Refactor the client to use a more streamlined API,
  `client.load(config)` and `client.didEntry(did)`

## 1.0.0 - 2022-11-30

### Added

- Initial commit.
