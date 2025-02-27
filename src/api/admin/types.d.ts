import { TimeStamps } from "@/shared/types";

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

export interface getCoordinatorsType extends TimeStamps {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role_id: number;
  faculty_id: number;
  status: string;
}

export interface getStudentsType extends TimeStamps {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role_id: number;
  faculty_id: number;
  status: string;
}

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

export interface DeleteFacultyType {
  id: string | number;
}

export interface PostResponse {
  data: string
  status: number
  message: string
}