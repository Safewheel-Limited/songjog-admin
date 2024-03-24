export interface Permission {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PermissionType {
  id: string;
  role: { name: string; id: number }[];
  updatedAt: string;
  createdAt: string;
  message: string;
  status: string;
  pagination: Pagination;
  data: Permission[];
}
