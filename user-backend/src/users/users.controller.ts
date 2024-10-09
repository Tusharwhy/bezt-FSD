import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User, Prisma } from '@prisma/client';
import { CreateUserInput } from '../interface/user.interface';

// Controller File for various CRUD method
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @Post()
  createUser(@Body() userData: CreateUserInput): Promise<User> {
    return this.usersService.createUser(userData);
  }

  @Get(':id')
  getUserById(@Param('id') id: string): Promise<User | null> {
    return this.usersService.getUserById(Number(id));
  }

  @Put(':id')
  updateUser(
    @Param('id') id: string,
    @Body() userData: Prisma.UserUpdateInput,
  ): Promise<User> {
    return this.usersService.updateUser(Number(id), userData);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string): Promise<User> {
    return this.usersService.deleteUser(Number(id));
  }
}
