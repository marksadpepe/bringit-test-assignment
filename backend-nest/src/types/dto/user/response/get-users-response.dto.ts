import { Type } from 'class-transformer';
import { IsNumber, IsString, IsUUID, IsBoolean } from 'class-validator';
import {
  GetUserItem,
  GetUserItemMeta,
  GetUsersData,
} from 'src/types/interfaces/user/user';

export class GetUserItemDto implements GetUserItem {
  @IsUUID('4')
  id: string;

  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsNumber()
  postCount: number;
}

export class GetUserItemMetaDto implements GetUserItemMeta {
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

export class GetUsersDataDto implements GetUsersData {
  @Type(() => GetUserItemDto)
  data: GetUserItemDto[];

  @Type(() => GetUserItemMetaDto)
  meta: GetUserItemMetaDto;
}
