import { Transform } from 'class-transformer';
import { IsString, MaxLength, IsEmail, Min, IsInt } from 'class-validator';
import { CreateUserItem } from 'src/types/interfaces/user/user';

export class CreateUserItemDto implements CreateUserItem {
  @IsString()
  @MaxLength(255)
  name: string;

  @IsEmail()
  @MaxLength(255)
  @Transform(({ value }: { value: string }) => value?.toLowerCase().trim())
  email: string;

  @IsInt()
  @Min(13, { message: 'Age must be greater than 12' })
  @Transform(({ value }: { value: number }) => Number(value))
  age: number;
}
