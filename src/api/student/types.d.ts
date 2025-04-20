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
  image_paths: string;
  user_id: number;
  faculty_id: number;
  status: string;
  active_flag: number;
  created_at: string;
  updated_at: string;
  createby: number;
  updateby: number;
  faculty: FacultyType;
  comments: CommentType[];
};

export type UploadArticlePayload = {
  title: string;
  description: string;
  article: File;
  photos: File[];
  faculty_id: number;
};

interface CommentUserType {
  id: number;
  profile: null | string;
  first_name: string;
  last_name: string;
  email: string;
  role_id: number;
  faculty_id: number;
  email_verified_at: null | string;
  is_password_change: number | boolean;
  last_login_at: null | string;
  last_login_ip: null | string;
  is_suspended: number | boolean;
  active_flag: boolean;
  created_at: string;
  updated_at: string;
  createby: null | number;
  updateby: null | number;
}

interface CommentWithUserType {
  id: number;
  comment: string;
  user_id: number;
  contribution_id: number;
  active_flag: boolean;
  created_at: string;
  updated_at: string;
  createby: number;
  updateby: number;
  user: CommentUserType;
}

export type CommentPayloadType = {
  comment: string;
  contribution_id: number;
};

interface DashboardData {
  latestCoordinatorComment: CoordinatorComment;
  setting: SystemSetting;
  statistics: Statistics;
}

interface CoordinatorComment {
  id: number;
  comment: string;
  user_id: number;
  contribution_id: number;
  active_flag: number;
  created_at: string;
  updated_at: string;
  createby: number;
  updateby: number | null;
  user: User;
}

interface User {
  id: number;
  first_name: string;
  last_name: string;
}

interface SystemSetting {
  id: number;
  academic_year: string;
  closure_date: string;
  final_closure_date: string;
  active_flag: number;
  created_at: string | null;
  updated_at: string;
  createby: number;
  updateby: number;
}

interface Statistics {
  contributions: Contribution[];
  statusCounts: StatusCount[];
  totalSubmissions: number;
  pendingReview: number;
  approved: number;
}

interface Contribution {
  id: number;
  title: string;
  description: string;
  article_path: string;
  image_paths: string;
  user_id: number;
  faculty_id: number;
  status: "pending" | "selected" | "reviewed" | "rejected";
  active_flag: number;
  created_at: string;
  updated_at: string;
  createby: number;
  updateby: number | null;
}

interface StatusCount {
  name: "pending" | "reviewed" | "selected" | "rejected";
  value: number;
}
