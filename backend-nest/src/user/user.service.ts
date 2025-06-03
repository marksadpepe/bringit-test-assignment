import { ConflictException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import {
  CreateUserItem,
  CreateUserItemResult,
  GetUsersData,
  GetUsersQueryParams,
} from 'src/types/interfaces/user/user';
import { UserDataMapper } from './user.data-mapper';
import { Prisma } from '../../generated/prisma/client';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userDataMapper: UserDataMapper,
  ) {}

  async createUser(data: CreateUserItem): Promise<CreateUserItemResult> {
    const { email } = data;

    const candidate = await this.userRepository.getByEmail(email);

    if (candidate) {
      throw new ConflictException(`User with email ${email} already exists`);
    }

    const user = await this.userRepository.create(data);

    return { success: Boolean(user) };
  }

  async getUsers(params: GetUsersQueryParams): Promise<GetUsersData> {
    console.log(params);
    const { page = 1, limit = 10, searchEmail } = params;

    const skip = (page - 1) * limit;

    const where: Prisma.UserWhereInput = {};

    if (searchEmail) {
      where.email = {
        contains: searchEmail,
      };
    }

    const [users, total] = await this.userRepository.getUsers(
      skip,
      limit,
      where,
    );

    const totalPages = Math.ceil(total / limit);

    return {
      data: users.map((user) => this.userDataMapper.toUserItem(user)),
      meta: {
        total,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  }
}
