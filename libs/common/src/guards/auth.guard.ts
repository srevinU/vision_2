import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  // private extractTokenFromHeader(request: Request): string | undefined {
  //   const [type, token] = request.headers('Authorization').split(' ')[1];
  //   return type === 'Bearer' ? token : undefined;
  // }

  private validateRequest(request: Request) {
    console.log(request);
    return true;
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return request;
  }
}
