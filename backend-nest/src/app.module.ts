import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { PostModule } from 'src/post/post.module';

@Module({
  imports: [UserModule, PostModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
