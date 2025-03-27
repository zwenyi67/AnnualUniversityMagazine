export type LoginPayload = {
  username: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  role: string;
};

export type FileUploadResponse = {
  file: string;
};

export type StudentArticle = {
  id: number;
  articleName: string;
};

// Comment Type
export type CommentType = {
  id: number;
  comment: string;
  user_id: number;
  contribution_id: number;
  comment_id: number | null;
  active_flag: number;
  created_at: string;
  updated_at: string;
  createby: number;
  updateby: number;
};

// Faculty Type
export type FacultyType = {
  id: number;
  name: string;
  description: string | null;
  active_flag: number;
  created_at: string;
  updated_at: string;
};

// Contribution Type
export type ContributionType = {
  id: number;
  title: string;
  description: string;
  article_path: string;
  image_paths: string[];
  user_id: number;
  faculty_id: number;
  status: string;
  active_flag: number;
  created_at: string;
  updated_at: string;
  createby: number;
  updateby: number;
  faculty: Faculty;
  comments: Comment[];
};

export type UploadArticlePayload = {
  title: string;
  description: string;
  article: File;
  photos: File[];
  faculty_id: number;
};
