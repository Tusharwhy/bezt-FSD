import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User, Prisma } from '@prisma/client';
import { CreateUserInput } from '../interface/user.interface';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany({ include: { profile: true } });
  }

  async createUser(data: CreateUserInput): Promise<User> {
    return this.prisma.user.create({
      data: {
        ...data,
        profile: {
          create: data.profile,
        },
      },
      include: {
        profile: true,
      },
    });
  }

  async getUserById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
      include: { profile: true },
    });
  }

  async updateUser(id: number, data: Prisma.UserUpdateInput): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data,
      include: { profile: true },
    });
  }

  async deleteUser(id: number): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
      include: { profile: true },
    });
  }
}
