import { IsBoolean } from 'class-validator';
import { CreatePostItemResult } from 'src/types/interfaces/post/post';

export class CreatePostItemResultDto implements CreatePostItemResult {
  @IsBoolean()
  success: boolean;
}
