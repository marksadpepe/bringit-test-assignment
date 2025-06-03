import { Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsString, IsUUID } from 'class-validator';
import {
  GetPostItem,
  GetPostItemMeta,
  GetPostsData,
  PostAuthorItem,
} from 'src/types/interfaces/post/post';

class PostAuthorItemDto implements PostAuthorItem {
  @IsUUID('4')
  id: string;

  @IsString()
  name: string;
}

export class GetPostItemDto implements GetPostItem {
  @IsUUID('4')
  id: string;

  @IsString()
  title: string;

  @Type(() => PostAuthorItemDto)
  author: PostAuthorItemDto;
}

export class GetPostItemMetaDto implements GetPostItemMeta {
  @IsNumber()
  total: number;

  @IsNumber()
  page: number;

  @IsNumber()
  limit: number;

  @IsNumber()
  totalPages: number;

  @IsBoolean()
  hasNextPage: boolean;

  @IsBoolean()
  hasPrevPage: boolean;
}

export class GetPostsDataDto implements GetPostsData {
  @Type(() => GetPostItemDto)
  data: GetPostItemDto[];

  @Type(() => GetPostItemMetaDto)
  meta: GetPostItemMetaDto;
}
