import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserItemDto } from 'src/types/dto/user/request/create-user-request.dto';
import { CreateUserItemResultDto } from 'src/types/dto/user/response/create-user-response.dto';
import { GetUsersDataDto } from 'src/types/dto/user/response/get-users-response.dto';
import { GetUsersQueryParamsDto } from 'src/types/dto/user/request/get-users-query-params.dto';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(
    @Body() data: CreateUserItemDto,
  ): Promise<CreateUserItemResultDto> {
    return await this.userService.createUser(data);
  }

  @Get()
  async getUsers(
    @Query() query: GetUsersQueryParamsDto,
  ): Promise<GetUsersDataDto> {
    return await this.userService.getUsers(query);
  }
}
