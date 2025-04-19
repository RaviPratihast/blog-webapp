export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface Author {
  avatar: string;
  name: string;
  date: string;
}

export interface ProcessedPost {
  id: number;
  category: string;
  title: string;
  description: string;
  author: Author;
  image: string;
}
