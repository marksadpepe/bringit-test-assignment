import { IsBoolean } from 'class-validator';
import { CreateUserItemResult } from 'src/types/interfaces/user/user';

export class CreateUserItemResultDto implements CreateUserItemResult {
  @IsBoolean()
  success: boolean;
}
