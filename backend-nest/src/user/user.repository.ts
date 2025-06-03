import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, User } from 'generated/prisma';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserItem } from 'src/types/interfaces/user/user';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateUserItem): Promise<User> {
    return await this.prismaService.user.create({ data });
  }

  async getByEmail(email: string): Promise<User | null> {
    return await this.prismaService.user.findUnique({ where: { email } });
  }

  async getUsers(
    skip: number,
    take: number,
    where: Prisma.UserWhereInput,
  ): Promise<[User[], number]> {
    const data: [User[], number] = await Promise.all([
      this.prismaService.user.findMany({
        where,
        skip,
        take,
      }),
      this.prismaService.user.count({
        where,
      }),
    ]);

    return data;
  }

  async getById(id: string): Promise<User> {
    const entity = await this.prismaService.user.findUnique({ where: { id } });

    if (!entity) {
      throw new NotFoundException(`User ${id} not found`);
    }

    return entity;
  }
}
