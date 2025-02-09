# `@digitalcredentials/issuer-registry-client` Changelog

## 3.1.0 - 2025-02-09

### Changed
- `client.load(config)` now returns a result (whereas it previously returned null) showing which registries loaded sucessfully and which didn't. This allows clients to provide end users with more information (i.e, a registry couldn't be checked) if they want to.

## 3.0.0 - 2024-08-05

### Changed
- **BREAKING**: Update to latest `@digitalcredentials/http-client@5.0.2`

## 2.0.0 - 2024-01-3

### Changed
- **BREAKING**: Refactor the client to use a more streamlined API, `client.load(config)`
  and `client.didEntry(did)`

## 1.0.0 - 2022-11-30

### Added
- Initial commit.
