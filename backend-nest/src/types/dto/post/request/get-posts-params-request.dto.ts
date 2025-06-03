import { IsOptional, IsInt, Min, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { GetPostsQueryParams } from 'src/types/interfaces/post/post';

export class GetPostsQueryParamsDto implements GetPostsQueryParams {
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
  searchTitle?: string;
}
