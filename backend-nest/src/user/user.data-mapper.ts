import { Injectable } from '@nestjs/common';
import { GetUserItem, UserWithCount } from 'src/types/interfaces/user/user';

@Injectable()
export class UserDataMapper {
  toUserItem(data: UserWithCount): GetUserItem {
    const {
      id,
      name,
      email,
      _count: { posts: postCount },
    } = data;

    return { id, name, email, postCount };
  }
}
