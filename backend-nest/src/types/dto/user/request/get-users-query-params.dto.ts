import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

import { GetUsersQueryParams } from 'src/types/interfaces/user/user';

export class GetUsersQueryParamsDto implements GetUsersQueryParams {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform(({ value }: { value: number }) => Number(value))
  page?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform(({ value }: { value: number }) => Number(value))
  limit?: number;

  @IsOptional()
  @IsString()
  searchEmail?: string;
}
