import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserLoginDto, CreateUserRegisterDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  register(@Body() createUserRegisterDto: CreateUserRegisterDto) {
    return this.usersService.register(createUserRegisterDto);
  }

  @Post('/login')
  login(@Body() CreateUserLoginDto: CreateUserLoginDto){
    return this.usersService.login(CreateUserLoginDto);
  }

  @Get()
  getAllUser(){
    return this.usersService.getAll();
  }

  @Get(':id')
  getUserByID(@Param('id') id: string){
    return this.usersService.getByID(id);
  }
}
