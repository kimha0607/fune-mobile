export interface ICategory {
  recordId: number;
  description: string;
  categoryName: string;
  parentId: number;
  color: string;
  imageUrl: string;
  path: string;
  deleted: boolean;
  createdBy: number;
  createdAt: string;
  updatedBy: number;
  updatedAt: string;
}

export interface IResponseCategoryParent {
  totalElements: number;
  totalPages: number;
  size: number;
  content: ICategory[];
}

export interface PayloadCategory {
  parentId: number;
  type: number;
}
