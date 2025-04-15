import { TimeStamps } from "@/shared/types";

export type GuestType = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role_id: number;
  faculty_id: number;
  password: string;
  is_password_change: number;
  is_suspended: number;
  active_flag: number;
  created_at: string;
};

export interface SelectedArticlesType extends TimeStamps {
    id: number,
    title: string;
    description: string;
    article_path: string;
    faculty: Faculty;
    student: Student;
}

export type Facutly = {
    id: number;
    name: string;
}

export type Student = {
    id: number;
    first_name: string;
    last_name: string;
}
