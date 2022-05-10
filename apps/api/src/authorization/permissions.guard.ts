import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  AUTHORIZATION_PERMISSIONS,
  AUTHORIZATION_PERMISSIONS_KEY,
} from '../others/utils/constants';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const [req] = context.getArgs();
    const userPermissions: AUTHORIZATION_PERMISSIONS[] =
      (req?.user || {})[AUTHORIZATION_PERMISSIONS_KEY] || [];
    const requiredPermissions: AUTHORIZATION_PERMISSIONS[] =
      this.reflector.get(AUTHORIZATION_PERMISSIONS_KEY, context.getHandler()) ||
      [];
    const hasAllRequiredPermissions = requiredPermissions.every((permission) =>
      userPermissions.includes(permission)
    );
    if (!requiredPermissions.length || hasAllRequiredPermissions) {
      return true;
    }

    throw new ForbiddenException('Insufficient Permissions');
  }
}
