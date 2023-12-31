# Known Issuer Registry Client _(@digitalcredentials/issuer-registry-client)_

[![Build status](https://img.shields.io/github/actions/workflow/status/digitalcredentials/issuer-registry-client/main.yml?branch=main)](https://github.com/digitalcredentials/issuer-registry-client/actions?query=workflow%3A%22Node.js+CI%22)
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

This is a client library for loading Known Issuer or Known Verifier Registries,
which are essentially dictionaries of DIDs, containing information on known
issuers and verifiers.

The format of these registries is temporary, while the
[Verifiable Issuers and Verifiers](https://w3c-ccg.github.io/verifiable-issuers-verifiers/)
spec is being incubated in the W3C CCG.

## Security

Assumes the loaded registries are public, accessible via `https`.

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

First, put together an array of known issuer and verifier registries you would
like to check against:

```js
const knownRegistries = [
  {
    "name": "DCC Pilot Registry",
    "url": "https://digitalcredentials.github.io/issuer-registry/registry.json"
  },
  {
    "name": "DCC Sandbox Registry",
    "url": "https://digitalcredentials.github.io/sandbox-registry/registry.json"
  },
  {
    "name": "DCC Community Registry",
    "url": "https://digitalcredentials.github.io/community-registry/registry.json"
  },
  {
    "name": "DCC Registry",
    "url": "https://digitalcredentials.github.io/dcc-registry/registry.json"
  }
]
```

You can now fetch them and query them

```js
import { loadRegistries } from '@digitalcredentials/issuer-registry-client'

// Load the registries from the web (typically done at app startup).
const registries = loadRegistries(knownRegistries)

registries.contains('did:example:123')
// { result: false }

// or
registries.contains('did:example:456')
// This DID is contained in one registry, DCC Registry
// { result: true, names: ['DCC Registry'] }
```

## Contribute

PRs accepted.

If editing the Readme, please conform to the
[standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

[MIT License](LICENSE.md) © 2022 Digital Credentials Consortium.
