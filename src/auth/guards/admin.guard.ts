import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private reflector: Reflector) {
  }

  canActivate( context: ExecutionContext, ): boolean | Promise<boolean> | Observable<boolean> {

    const ctx = context.switchToHttp();
    const request = ctx.getRequest(); 

    if(request.user.is_admin){
      return true;
    }
    return false;

  }
}
