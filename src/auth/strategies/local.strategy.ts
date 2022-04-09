import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(username: string, password: string){
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new HttpException({
        status: HttpStatus.UNAUTHORIZED,
        msg: 'Invalid credential'
      }, HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}