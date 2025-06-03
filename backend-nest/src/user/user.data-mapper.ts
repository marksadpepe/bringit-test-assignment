import { Injectable } from '@nestjs/common';
import { User } from 'generated/prisma';
import { GetUserItem } from 'src/types/interfaces/user/user';

@Injectable()
export class UserDataMapper {
  toUserItem(data: User): GetUserItem {
    const { id, name, email } = data;

    return { id, name, email, postCount: 4 };
  }
}
