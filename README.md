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

Note that an individual DID can appear in multiple registries.
Because of that, the _order_ of registries loaded matters. For example, given
a registry:

```js
const knownRegistries = [{
    "name": "DCC Pilot Registry",
    "url": "https://digitalcredentials.github.io/issuer-registry/registry.json"
  },
  {
    "name": "DCC Sandbox Registry",
    "url": "https://digitalcredentials.github.io/sandbox-registry/registry.json"
  }]
```

If an issuer DID is contained in both of those registries, the issuer entry
(that contains the issuer name and URL) will come from the _first_ registry,
"DCC Pilot Registry".

In other words, verifiers and other implementers must order the registries
_in order of most authoritative to least_.

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

You can now:

```js
import { RegistryClient } from '@digitalcredentials/issuer-registry-client'

const registries = new RegistryClient()

// Load the registries from the web (typically done at app startup).
await registries.load({ config: knownRegistries })

// You can now query to see if a DID is known in any registry
console.log(registries.didEntry('did:key:z6MkpLDL3RoAoMRTwTgo3rs39ZwssfaPKtGdZw7AGRN7CK4W'))
/**
DidMapRegistryEntry {
  name: 'My University',
  url: 'https://digitalcredentials.mit.edu',
  location: 'Cambridge, MA, USA',
  inRegistries: Set(2) {
    {
      name: 'DCC Community Registry',
      url: 'https://digitalcredentials.github.io/community-registry/registry.json',
      rawContents: [Object]
    },
    {
      name: 'DCC Sandbox Registry',
      url: 'https://digitalcredentials.github.io/sandbox-registry/registry.json',
      rawContents: [Object]
    }
  }
}
 */

registries.didEntry('did:example:does-not-exist')
// undefined
```

## Contribute

PRs accepted.

If editing the Readme, please conform to the
[standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

[MIT License](LICENSE.md) © 2022 Digital Credentials Consortium.
