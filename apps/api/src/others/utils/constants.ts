export enum CUSTOM_EXCEPTION_CODES {
  AUTH_USER_NOT_FULLY_REGISTERED = 'AUTH_USER_NOT_FULLY_REGISTERED',
  ENTITY_NOT_OWNED_BY_USER = 'ENTITY_NOT_OWNED_BY_USER',
  ENTITY_INVALID_ATTRIBUTE = 'ENTITY_INVALID_ATTRIBUTE',
  ENTITY_MISSING_ATTRIBUTE_ONE_OF = 'ENTITY_MISSING_ATTRIBUTE_ONE_OF',
  RELATED_ENTITY_MISSING = 'RELATED_ENTITY_MISSING',
  PAYLOAD_COLLISION = 'PAYLOAD_COLLISION',
}

export enum AUTHORIZATION_PERMISSIONS {
  ACCOUNT_RESOURCES_WRITE = 'write:account:resources', // Permission to write to your own resources
}

export const AUTHORIZATION_PERMISSIONS_KEY = 'permissions';
