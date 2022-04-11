import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService
  ){}

  async register(registerDto: RegisterDto){
    return await this.usersService.create(registerDto);
  }

  async validateUser(email: string, pass: string){
    const user = await this.usersService.getByEmail(email);

    const isValidPassword = await user.comparePassword(pass);
    if(!isValidPassword){
      throw new HttpException({
        status: HttpStatus.UNAUTHORIZED,
        msg: 'Invalid credential'
      }, HttpStatus.UNAUTHORIZED);
    }
    const {password, ...result} = user;
    return result;
  }

  async login(user: any){
    const payload = { id: user.id, email: user.email, is_admin: user.is_admin };
    return {
      access_token: this.jwtService.sign(payload)
    }
  }

}
