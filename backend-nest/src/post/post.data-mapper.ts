import { Injectable } from '@nestjs/common';
import {
  GetPostItem,
  PostItemWithAuthor,
} from 'src/types/interfaces/post/post';

@Injectable()
export class PostDataMapper {
  toPostItem(data: PostItemWithAuthor): GetPostItem {
    const { id, title, author } = data;

    return { id, title, author };
  }
}
