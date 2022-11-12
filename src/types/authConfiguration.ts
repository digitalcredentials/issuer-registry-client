/** 
 * Adapted from https://github.com/FormidableLabs/react-native-app-auth/blob/main/index.d.ts
 */

type ServiceConfiguration = {
  authorizationEndpoint: string;
  tokenEndpoint: string;
  revocationEndpoint?: string;
  registrationEndpoint?: string;
  endSessionEndpoint?: string;
};

type BaseConfiguration =
  | { issuer?: string; serviceConfiguration: ServiceConfiguration; }
  | { issuer: string; serviceConfiguration?: ServiceConfiguration; }

export type AuthConfiguration = BaseConfiguration & {
  clientId: string;
  clientSecret?: string;
  scopes: string[];
  redirectUrl: string;
};
