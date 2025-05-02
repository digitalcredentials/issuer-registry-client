export const oidfECResponseDCC = 'eyJhbGciOiJFUzI1NiIsInR5cCI6ImVudGl0eS1zdGF0ZW1lbnQrand0Iiwia2lkIjoiaXNzdWVycmVnaXN0cnkta2V5MSJ9.eyJzdWIiOiJodHRwczovL3Rlc3QucmVnaXN0cnkuZGNjb25zb3J0aXVtLm9yZyIsIm1ldGFkYXRhIjp7ImZlZGVyYXRpb25fZW50aXR5Ijp7Im9yZ2FuaXphdGlvbl9uYW1lIjoiRGlnaXRhbCBDcmVkZW50aWFscyBDb25zb3J0aXVtIChURVNUKSIsImhvbWVwYWdlX3VyaSI6Imh0dHBzOi8vZGlnaXRhbGNyZWRlbnRpYWxzLm1pdC5lZHUiLCJsb2dvX3VyaSI6ImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQ0FBQUFBZ0NBSUFBQUQ4R08yakFBQUFBWE5TUjBJQXJzNGM2UUFBQUFSblFVMUJBQUN4and2OFlRVUFBQUFKY0VoWmN3QUFFblFBQUJKMEFkNW1IM2dBQUFDcVNVUkJWRWhMN1pGYkNvUkFEQVE5d1Y3Slg2Kys0SjAwa0NXT1JYYk02Q2krb0w0bTNWMklUZHYxdTNJeXdmRDlDSGpNVXlEUTlWSkhWSkN1S3dqODR5RUNUQnVJdWR4YmdMa01LS1pNQW5RMllyTS9BYzVWT0ZaUTNXR3pzNStNMEdyU3pabEFRSFFGR0tSQVFLRUlUQW1PUUVGekVkU05WMkNnYmxRVENGaFFmQUdhUVRDaW5Fd1F1UUpIZ0pxQ2pJQ0Fnb3dRK2dKY2pVaHNRWUIzbDN6WUYxVGs2b0t1SHdHNUlCaUl6N2J4K1FBQUFBQkpSVTVFcmtKZ2dnPT0iLCJwb2xpY3lfdXJpIjoiaHR0cHM6Ly90ZXN0LnJlZ2lzdHJ5LmRjY29uc29ydGl1bS5vcmcvZ292ZXJuYW5jZS1wb2xpY3kiLCJmZWRlcmF0aW9uX2ZldGNoX2VuZHBvaW50IjoiaHR0cHM6Ly90ZXN0LnJlZ2lzdHJ5LmRjY29uc29ydGl1bS5vcmcvZmV0Y2giLCJmZWRlcmF0aW9uX2xpc3RfZW5kcG9pbnQiOiJodHRwczovL3Rlc3QucmVnaXN0cnkuZGNjb25zb3J0aXVtLm9yZy9zdWJvcmRpbmF0ZV9saXN0aW5nIn0sImluc3RpdHV0aW9uX2FkZGl0aW9uYWxfaW5mb3JtYXRpb24iOnsibGVnYWxfbmFtZSI6IkRpZ2l0YWwgQ3JlZGVudGlhbHMgQ29uc29ydGl1bSwgSW5jLiJ9fSwiaXNzIjoiaHR0cHM6Ly90ZXN0LnJlZ2lzdHJ5LmRjY29uc29ydGl1bS5vcmciLCJleHAiOjE3NDYwMzQwODEsImlhdCI6MTc0NTk0NzY4MSwianRpIjoib3pmM3JpbnR4dCIsImp3a3MiOnsia2V5cyI6W3sia3R5IjoiRUMiLCJjcnYiOiJQLTI1NiIsImtpZCI6Imlzc3VlcnJlZ2lzdHJ5LWtleTEiLCJ4IjoiUnoxTkhNSl90QVpRWHNKT1lxbllydUdZaW1HNldOT3AwTjIzNEU3d3FPcyIsInkiOiJKNWlDTGIyVF95c0NIcGpGemNSM2lXLXR1RHVYRUhuSlB2ZlZNUVpPZnpZIn1dfX0.n007FjTUIX7DrmacLoLq-z5FcWiNdMkJoB2UcjAjRY5N4Hf3cINDWrNrncnOPBnGp3pe9SRJz1iDb-yAjWVEFQ'

// the above JWT decodes to something like this:
/* {
    "sub": "https://registry.dcconsortium.org",
    "metadata": {
      "federation_entity": {
        "organization_name": "Digital Credentials Consortium (TEST)",
        "homepage_uri": "https://digitalcredentials.mit.edu",
        "logo_uri": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAACqSURBVEhL7ZFbCoRADAQ9wV7JX6++4J00kCWORXbM6Ci+oL4m3V2ITdv1u3IywfD9CHjMUyDQ9VJHVJCuKwj84yECTBuIudxbgLkMKKZMAnQ2YrM/Ac5VOFZQ3WGzs5+M0GrSzZlAQHQFGKRAQKEITAmOQEFzEdSNV2CgblQTCFhQfAGaQTCinEwQuQJHgJqCjICAgowQ+gJcjUhsQYB3l3zYF1Tk6oKuHwG5IBiIz7bx+QAAAABJRU5ErkJggg==",
        "policy_uri": "https://registry.dcconsortium.org/governance-policy",
        "federation_fetch_endpoint": "https://registry.dcconsortium.org/fetch",
        "federation_list_endpoint": "https://registry.dcconsortium.org/subordinate_listing"
      },
      "institution_additional_information": {
        "legal_name": "Digital Credentials Consortium, Inc."
      }
    },
    "iss": "https://registry.dcconsortium.org",
    "exp": 1746022185,
    "iat": 1745935785,
    "jti": "bdmrixn80dm",
    "jwks": {
      "keys": [
        {
          "kty": "EC",
          "crv": "P-256",
          "kid": "issuerregistry-key1",
          "x": "Rz1NHMJ_tAZQXsJOYqnYruGYimG6WNOp0N234E7wqOs",
          "y": "J5iCLb2T_ysCHpjFzcR3iW-tuDuXEHnJPvfVMQZOfzY"
        }
      ]
    }
  } */
