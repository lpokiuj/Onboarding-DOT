import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUser(){
    return this.usersService.getAll();
  }

  @Get(':id')
  getUserByID(@Param('id') id: string){
    return this.usersService.getByID(id);
  }
}
