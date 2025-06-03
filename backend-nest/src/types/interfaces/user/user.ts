export interface CreateUserItem {
  name: string;
  email: string;
  age: number;
}

export interface CreateUserItemResult {
  success: boolean;
}

export interface GetUserItem {
  id: string;
  name: string;
  email: string;
  postCount: number;
}

export interface GetUserItemMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface GetUsersData {
  data: GetUserItem[];
  meta: GetUserItemMeta;
}

export interface GetUsersQueryParams {
  page?: number;
  limit?: number;
  searchEmail?: string;
}
