# Known Issuer Registry Client _(@digitalcredentials/issuer-registry-client)_

[![Build status](https://img.shields.io/github/workflow/status/digitalcredentials/issuer-registry-client/Node.js%20CI)](https://github.com/digitalcredentials/issuer-registry-client/actions?query=workflow%3A%22Node.js+CI%22)
[![NPM Version](https://img.shields.io/npm/v/@digitalcredentials/issuer-registry-client.svg)](https://npm.im/@digitalcredentials/issuer-registry-client)

> Isomorphic client for fetching Known Issuer/Known Verifier registries for Node, browser and React Native.

## Table of Contents

- [Background](#background)
- [Security](#security)
- [Install](#install)
- [Usage](#usage)
- [Contribute](#contribute)
- [License](#license)

## Background

TBD

## Security

TBD

## Install

- Node.js 18+ is recommended.

### NPM

To install via NPM:

```
npm install @digitalcredentials/issuer-registry-client
```

### Development

To install locally (for development):

```
git clone https://github.com/digitalcredentials/issuer-registry-client.git
cd issuer-registry-client
npm install
```

## Usage

The library exports two main things: a global `registryCollection`, containing 
an instance of registry collections, and a loading function.

```js
import { registryCollections, loadRegistryCollections } from '@digitalcredentials/issuer-registry-client'

// registryCollections is empty, when first exported

// Load the registries from the web (typically done at app startup).
await loadRegistryCollections()

// You can now query to see if a given DID is in a registry
isInRegistryCollection('did:example:123')
// false
```

## Contribute

PRs accepted.

If editing the Readme, please conform to the
[standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

[MIT License](LICENSE.md) © 2022 Digital Credentials Consortium.
