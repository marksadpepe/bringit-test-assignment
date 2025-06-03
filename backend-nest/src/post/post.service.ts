import { Injectable } from '@nestjs/common';
import { PostRepository } from 'src/post/post.repository';
import {
  CreatePostItem,
  CreatePostItemResult,
  GetPostsData,
  GetPostsQueryParams,
} from 'src/types/interfaces/post/post';
import { Prisma } from 'generated/prisma';
import { PostDataMapper } from 'src/post/post.data-mapper';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly postDataMapper: PostDataMapper,
  ) {}

  async createPost(data: CreatePostItem): Promise<CreatePostItemResult> {
    const post = await this.postRepository.create(data);

    return { success: Boolean(post) };
  }

  async getPosts(params: GetPostsQueryParams): Promise<GetPostsData> {
    const { page = 1, limit = 10, searchTitle } = params;

    const skip = (page - 1) * limit;

    const where: Prisma.PostWhereInput = {};

    if (searchTitle) {
      where.title = {
        contains: searchTitle,
      };
    }

    const [posts, total] = await this.postRepository.getPosts(
      skip,
      limit,
      where,
    );

    const totalPages = Math.ceil(total / limit);

    return {
      data: posts.map((post) => this.postDataMapper.toPostItem(post)),
      meta: {
        total,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  }
}
