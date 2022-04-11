import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto){

    // Search for existed email
    const emailExist = await this.usersRepository.findOne({ email: createUserDto.email });
    if(emailExist){
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'Email already exist'
      }, HttpStatus.BAD_REQUEST);
    }

    // Save account
    const user = this.usersRepository.create(createUserDto);
    
    const savedUser = await this.usersRepository.save(user);

    return savedUser;
  }

  getAll(){
    return this.usersRepository.find();
  }
  
  async getByID(id: string | number){

    if(typeof id === 'number'){
      const user = await this.usersRepository.findOne(id);
      return user;
    }

    const user = await this.usersRepository.findOne(id);
    if(!user){
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'User not found'
      }, HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async getByEmail(email: string){
    const user = await this.usersRepository.findOne({ email });
    if(!user){
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'User not found'
      }, HttpStatus.NOT_FOUND);
    }
    return user;
  }

}
