export const mixedResult = {
  "matchingIssuers": [
    {
      "issuer": {
        "sub": "did:web:oneuni.testuni.edu",
        "metadata": {
          "federation_entity": {
            "organization_name": "OneUni University",
            "homepage_uri": "https://oneuni.edu",
            "logo_uri": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAB4SURBVEhLY1Da6ENTNGoBQTRqAUE0Yixwkq3X5tNgAANBkRlosvgQERbM0OaAmAwFNLFAkMNdW2KGkwjIE1S3AIFGLSCIRi0giEYtwIHq5Tk0BCEIaDwIwLh89RiKMRBRFkDNxQBUsoAyNGoBQTRqAUE01C3Y6AMAsDxJowXOs6oAAAAASUVORK5CYII="
          },
          "institution_additional_information": {
            "legal_name": "Board and Trustees of OneUni University"
          },
          "credential_registry_entity": {
            "ctid": "ce-e8a41a52-6ff6-48f0-9872-889c87b093b7",
            "ce_url": "https://credentialengineregistry.org/resources/ce-e8a41a52-6ff6-48f0-9872-889c87b093b7"
          },
          "ror_entity": {
            "rorid": "042nb2s44",
            "ror_url": "https://ror.org/042nb2s44"
          }
        },
        "iss": "https://test.registry.dcconsortium.org",
        "exp": 1745690382,
        "iat": 1745603982,
        "jti": "bvcqwgt0xsq"
      },
      "registry": {
        "type": "oidf",
        "fetchEndpoint": "https://test.registry.dcconsortium.org/fetch?sub=",
        "name": "DCC Member Registry"
      }
    },
    {
      "issuer": {
        "name": "Issuer Registry Client test",
        "location": "here",
        "url": "https://dcconsortium.org/"
      },
      "registry": {
        "type": "dcc-legacy",
        "name": "DCC Community Registry",
        "url": "https://digitalcredentials.github.io/community-registry/registry.json"
      }
    }
  ],
  "uncheckedRegistries": []
}