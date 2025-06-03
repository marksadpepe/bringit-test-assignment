import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PostService } from 'src/post/post.service';
import { CreatePostItemDto } from 'src/types/dto/post/request/create-post-request.dto';
import { CreatePostItemResultDto } from 'src/types/dto/post/response/create-post-response.dto';
import { GetPostsQueryParamsDto } from 'src/types/dto/post/request/get-posts-params-request.dto';
import { GetPostsDataDto } from 'src/types/dto/post/response/get-posts-response.dto';

@ApiTags('Post')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async createPost(
    @Body() data: CreatePostItemDto,
  ): Promise<CreatePostItemResultDto> {
    return await this.postService.createPost(data);
  }

  @Get()
  async getPosts(
    @Query() params: GetPostsQueryParamsDto,
  ): Promise<GetPostsDataDto> {
    return await this.postService.getPosts(params);
  }
}
