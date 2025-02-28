import { TimeStamps } from "@/shared/types";


// Admin Management Type

export interface getAdminsType extends TimeStamps {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role_id: number;
  faculty_id: number;
  status: string;
}

export interface AddAdminPayloadType {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role_id: number;
  createby?: number;
}

export interface UpdateAdminPayloadType {
  id: string | number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role_id: number;
  updateby?: number;
}

// Manager Management Type

export interface getManagersType extends TimeStamps {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role_id: number;
  faculty_id?: number;
  status: string;
}

export interface AddManagerPayloadType {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role_id: number;
  createby?: number;
}

export interface UpdateManagerPayloadType {
  id: string | number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role_id: number;
  updateby?: number;
}

// Coordinator Management Type

export interface getCoordinatorsType extends TimeStamps {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role_id: number;
  faculty_id: number;
  status: string;
  faculty: Faculty;
}

export interface Faculty {
  id: number;
  name: string;
}

export interface AddCoordinatorPayloadType {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role_id: number;
  faculty_id: number;
  createby?: number;
}

export interface UpdateCoordinatorPayloadType {
  id: string | number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role_id: number;
  faculty_id: number;
  updateby?: number;
}

// Student Management Type

export interface getStudentsType extends TimeStamps {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role_id: number;
  faculty_id: number;
  status: string;
  faculty: Faculty;
}

export interface AddStudentPayloadType {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role_id: number;
  faculty_id: number;
  createby?: number;
}

export interface UpdateStudentPayloadType {
  id: string | number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role_id: number;
  faculty_id: number;
  updateby?: number;
}

// Faculty Management Type

export interface GetFacultiesType extends TimeStamps {
  id: number;
  name: string;
  description: string;
  status: string;
}

export interface AddFacultyPayloadType {
  name: string;
  description: string;
  createby?: number;
}

export interface UpdateFacultyPayloadType {
  id: string | number;
  name: string;
  description: string;
  updateby?: number;
}

export interface PostResponse {
  data: string
  status: number
  message: string
}