export interface ICategory {
  id: string;
  createdAt: string;
  title: string;
  description: string;
}

export interface ICategoryInput  {
  title: string;
  description: string;
}