export interface User {
  id: string;
  email: string;
  name: string;
  username: string;
  bio?: string;
  avatar?: string;
  coverImage?: string;
  location?: string;
  website?: string;
  userType: 'ENTREPRENEUR' | 'INVESTOR' | 'MENTOR' | 'SERVICE_PROVIDER';
  verified: boolean;
  createdAt: Date;
}

export interface Post {
  id: string;
  content: string;
  images: string[];
  userId: string;
  user: User;
  createdAt: Date;
  _count?: {
    likes: number;
    comments: number;
  };
}

export interface Comment {
  id: string;
  content: string;
  postId: string;
  userId: string;
  user: User;
  createdAt: Date;
}
