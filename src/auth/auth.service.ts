import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService){}

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

}
