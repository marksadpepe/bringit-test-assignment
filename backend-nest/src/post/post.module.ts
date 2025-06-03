import { Module } from '@nestjs/common';
import { PostController } from 'src/post/post.controller';
import { PostService } from 'src/post/post.service';
import { UserModule } from 'src/user/user.module';
import { PostRepository } from 'src/post/post.repository';
import { DatabaseModule } from 'src/database/database.module';
import { PostDataMapper } from 'src/post/post.data-mapper';

@Module({
  imports: [UserModule, DatabaseModule],
  controllers: [PostController],
  providers: [PostService, PostRepository, PostDataMapper],
})
export class PostModule {}
