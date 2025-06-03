import { Post } from 'generated/prisma';

export interface CreatePostItem {
  title: string;
  content: string;
  authorId: string;
}

export interface CreatePostItemResult {
  success: boolean;
}

export interface GetPostsQueryParams {
  page?: number;
  limit?: number;
  searchTitle?: string;
}

export interface PostAuthorItem {
  id: string;
  name: string;
}

export interface GetPostItem {
  id: string;
  title: string;
  author: PostAuthorItem;
}

export interface GetPostItemMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface GetPostsData {
  data: GetPostItem[];
  meta: GetPostItemMeta;
}

export interface PostItemWithAuthor extends Post {
  author: PostAuthorItem;
}
