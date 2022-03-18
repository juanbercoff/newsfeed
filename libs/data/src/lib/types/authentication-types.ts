export type AuthenticatedRequest = Request & {
  user: AuthenticatedUser | FullyRegisteredAuthenticatedUser;
};

export type AuthenticatedUser = {
  iss: string;
  sub: string; // Auth0 Id
  aud: string[];
  iat: number;
  exp: number;
  azp: string;
  scope: string;
  permissions: string[];
};

export type FullyRegisteredAuthenticatedUser = AuthenticatedUser & {
  metadata: {
    userId: string;
  };
};

export type MachineToMachineAccessTokenResponse = {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
};

export type Auth0User = {
  user_id: string;
  email: string;
  email_verified: boolean;
  username: string;
  phone_number: string;
  phone_verified: boolean;
  created_at: string;
  updated_at: string;
  identities: {
    connection: string;
    user_id: string;
    provider: string;
    isSocial: boolean;
  }[];
  app_metadata: Record<string, any>;
  user_metadata: Record<string, any>;
  picture: string;
  name: string;
  nickname: string;
  multifactor: string[];
  last_ip: string;
  last_login: string;
  logins_count: number;
  blocked: boolean;
  given_name: string;
  family_name: string;
};
