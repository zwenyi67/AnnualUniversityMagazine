import { CommonUserPayload, TimeStamps } from "@/shared/types";


// Admin Management Type

export interface getAdminsType extends TimeStamps, CommonUserPayload {
  id: number;
  faculty_id: number;
}

export interface AddAdminPayloadType extends CommonUserPayload {
  createby?: number;
}

export interface UpdateAdminPayloadType extends CommonUserPayload {
  id: string | number;
  updateby?: number;
}

// Manager Management Type

export interface getManagersType extends TimeStamps, CommonUserPayload  {
  id: number;
  faculty_id?: number;
}

export interface AddManagerPayloadType extends CommonUserPayload {
  createby?: number;
}

export interface UpdateManagerPayloadType extends CommonUserPayload {
  id: string | number;
  updateby?: number;
}

// Coordinator Management Type

export interface getCoordinatorsType extends TimeStamps, CommonUserPayload  {
  id: number;
  faculty_id: number;
  status: string;
  faculty: Faculty;
}

export interface Faculty extends CommonUserPayload {
  id: number;
  name: string;
}

export interface AddCoordinatorPayloadType extends CommonUserPayload {
  faculty_id: number;
  createby?: number;
}

export interface UpdateCoordinatorPayloadType extends CommonUserPayload {
  id: string | number;
  faculty_id: number;
  updateby?: number;
}

// Student Management Type

export interface getStudentsType extends TimeStamps, CommonUserPayload {
  id: number;
  faculty_id: number;
  faculty: Faculty;
}

export interface AddStudentPayloadType extends CommonUserPayload {
  faculty_id: number;
  createby?: number;
}

export interface UpdateStudentPayloadType extends CommonUserPayload {
  id: string | number;
  faculty_id: number;
  updateby?: number;
}

// Guest Management Type

export interface getGuestsType extends TimeStamps, CommonUserPayload  {
  id: number;
  faculty_id: number;
  faculty: Faculty;
}

export interface AddGuestPayloadType extends CommonUserPayload {
  faculty_id: number;
  createby?: number;
}

export interface UpdateGuestPayloadType extends CommonUserPayload {
  id: string | number;
  faculty_id: number;
  updateby?: number;
}

// Faculty Management Type

export interface GetFacultiesType extends TimeStamps, CommonUserPayload  {
  id: number;
  name: string;
  description: string;
  status: string;
}

export interface AddFacultyPayloadType extends CommonUserPayload {
  name: string;
  description: string;
  createby?: number;
}

export interface UpdateFacultyPayloadType extends CommonUserPayload {
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