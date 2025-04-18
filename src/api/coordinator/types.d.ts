export type CoordinatorsType = {
  id: number;
  title: string;
  description: string;
  file_path: string;
  image_path: string;
  user_id: number;
  faculty_id: number;
  status: "pending" | "reviewed" | "selected";
  active_flag: number;
  created_at: string;
  updated_at: string;
  createby: number;
  updateby: number | null;
  first_name: string;
  last_name: string;
  faculty_name: string;
  comments?: ArticleComment[];
};

export type ArticleComment = {
  id: number;
  comment: string;
  created_at: string;
  user_id: number;
  name: string;
};

export type CommentResponse = {
  id: number;
  comment: string;
  user_id: number;
  contribution_id: number;
  createby: number;
  created_at: string;
  updated_at: string;
  name: string;
};
