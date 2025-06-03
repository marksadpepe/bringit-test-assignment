import { IsInt, IsOptional, IsString, Min } from 'class-validator';

import { GetUsersQueryParams } from 'src/types/interfaces/user/user';

export class GetUsersQueryParamsDto implements GetUsersQueryParams {
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number;

  @IsOptional()
  @IsString()
  searchEmail?: string;
}
