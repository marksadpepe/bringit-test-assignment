import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/database/database.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserDataMapper } from './user.data-mapper';

@Module({
  imports: [DatabaseModule],
  providers: [UserService, UserRepository, UserDataMapper],
  exports: [UserRepository],
  controllers: [UserController],
})
export class UserModule {}
