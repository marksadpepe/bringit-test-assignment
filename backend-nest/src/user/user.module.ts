import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/database/database.module';
import { UserService } from 'src/user/user.service';
import { UserController } from 'src/user/user.controller';
import { UserRepository } from 'src/user/user.repository';
import { UserDataMapper } from 'src/user/user.data-mapper';

@Module({
  imports: [DatabaseModule],
  providers: [UserService, UserRepository, UserDataMapper],
  exports: [UserRepository],
  controllers: [UserController],
})
export class UserModule {}
