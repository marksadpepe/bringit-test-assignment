import { IsString, IsUUID } from 'class-validator';
import { CreatePostItem } from 'src/types/interfaces/post/post';

export class CreatePostItemDto implements CreatePostItem {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsUUID('4')
  authorId: string;
}
