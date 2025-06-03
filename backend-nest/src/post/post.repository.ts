import { Injectable } from '@nestjs/common';
import { Post, Prisma } from 'generated/prisma';
import { PrismaService } from 'src/database/prisma.service';
import {
  CreatePostItem,
  PostItemWithAuthor,
} from 'src/types/interfaces/post/post';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class PostRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userRepository: UserRepository,
  ) {}

  async create(data: CreatePostItem): Promise<Post> {
    const { authorId, content, title } = data;

    const user = await this.userRepository.getById(authorId);

    return await this.prismaService.post.create({
      data: {
        title,
        content,
        authorId: user.id,
      },
    });
  }

  async getPosts(
    skip: number,
    take: number,
    where: Prisma.PostWhereInput,
  ): Promise<[PostItemWithAuthor[], number]> {
    const data: [PostItemWithAuthor[], number] = await Promise.all([
      this.prismaService.post.findMany({
        where,
        skip,
        take,
        include: { author: { select: { id: true, name: true } } },
      }),
      this.prismaService.post.count({
        where,
      }),
    ]);

    return data;
  }
}
