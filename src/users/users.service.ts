import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserLoginDto, CreateUserRegisterDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async register(createUserRegisterDto: CreateUserRegisterDto){

    // Search for existed email
    const emailExist = await this.usersRepository.findOne({ email: createUserRegisterDto.email });
    if(emailExist){
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'Email already exist'
      }, HttpStatus.BAD_REQUEST);
    }

    // Save account
    const user = this.usersRepository.create(createUserRegisterDto);
    
    this.usersRepository.save(user);

    const returnMsg = {
      success: true,
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      message: "Success register"
    }

    return returnMsg;
  }

  async login(createUserLoginDto: CreateUserLoginDto){

    // Check Email
    const user = await this.usersRepository.findOne({ email: createUserLoginDto.email });
    if(!user){
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Email not found'
      }, HttpStatus.NOT_FOUND);
    }

    // Check Password
    if(user.password != createUserLoginDto.password){
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'Password not match'
      }, HttpStatus.FORBIDDEN);
    }

    // Success
    const returnMsg = {
      success: true,
      data: {
        email: user.email,
        name: user.name,
      },
      message: "Success login"
    }
    return returnMsg;
  }  
}
