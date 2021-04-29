import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class Scopes implements CanActivate {
  constructor(private readonly requiredScopes: string[]) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredScopes = this.requiredScopes;

    const req = context.switchToHttp().getRequest();
    const user = req.user;

    if (!user) {
      return false;
    }

    const role = user.role;

    if (Array.isArray(requiredScopes) && !requiredScopes.length) {
      return true;
    }

    if (requiredScopes.includes(role)) {
      return true;
    }

    return false;
  }
}
