export const mixedResult = {
  matchingIssuers: [
    {
      issuer: {
        federation_entity: {
          organization_name: 'OneUni University',
          homepage_uri: 'https://oneuni.edu',
          logo_uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAB4SURBVEhLY1Da6ENTNGoBQTRqAUE0Yixwkq3X5tNgAANBkRlosvgQERbM0OaAmAwFNLFAkMNdW2KGkwjIE1S3AIFGLSCIRi0giEYtwIHq5Tk0BCEIaDwIwLh89RiKMRBRFkDNxQBUsoAyNGoBQTRqAUE01C3Y6AMAsDxJowXOs6oAAAAASUVORK5CYII='
        },
        institution_additional_information: {
          legal_name: 'Board and Trustees of OneUni University'
        },
        credential_registry_entity: {
          ctid: 'ce-e8a41a52-6ff6-48f0-9872-889c87b093b7',
          ce_url: 'https://credentialengineregistry.org/resources/ce-e8a41a52-6ff6-48f0-9872-889c87b093b7'
        },
        ror_entity: {
          rorid: '042nb2s44',
          ror_url: 'https://ror.org/042nb2s44'
        }
      },
      registry: {
        federation_entity: {
          organization_name: 'Digital Credentials Consortium (TEST)',
          homepage_uri: 'https://digitalcredentials.mit.edu',
          logo_uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAACqSURBVEhL7ZFbCoRADAQ9wV7JX6++4J00kCWORXbM6Ci+oL4m3V2ITdv1u3IywfD9CHjMUyDQ9VJHVJCuKwj84yECTBuIudxbgLkMKKZMAnQ2YrM/Ac5VOFZQ3WGzs5+M0GrSzZlAQHQFGKRAQKEITAmOQEFzEdSNV2CgblQTCFhQfAGaQTCinEwQuQJHgJqCjICAgowQ+gJcjUhsQYB3l3zYF1Tk6oKuHwG5IBiIz7bx+QAAAABJRU5ErkJggg==',
          policy_uri: 'https://test.registry.dcconsortium.org/governance-policy',
          federation_fetch_endpoint: 'https://test.registry.dcconsortium.org/fetch',
          federation_list_endpoint: 'https://test.registry.dcconsortium.org/subordinate_listing'
        },
        institution_additional_information: {
          legal_name: 'Digital Credentials Consortium, Inc.'
        }
      }
    },
    {
      issuer: {
        federation_entity: {
          organization_name: 'Issuer Registry Client test',
          homepage_uri: 'https://dcconsortium.org/',
          location: 'here'
        }
      },
      registry: {
        type: 'dcc-legacy',
        federation_entity: {
          organization_name: 'DCC Community Registry'
        },
        institution_additional_information: {
          legacy_list: 'https://digitalcredentials.github.io/community-registry/registry.json'
        }
      }
    }
  ],
  uncheckedRegistries: []
}
