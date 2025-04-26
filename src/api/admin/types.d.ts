import { CommonUserPayload, TimeStamps } from "@/shared/types";


// Dashboard Data

export type DashboardDataType = {
  managers: number;
  coordinators: number;
  students: number;
  guests: number;
  faculties: number;
  contributions: number;
  approved: number;
  rejected: number;
  setting: Setting;
  contributionData: ContributionChartData[];
  contributionDataByFaculty: ContributionDataByFaculty[];
  contributionWithoutComment: ContributionWithoutComment[];
  contributionWithoutCommentAfter14: ContributionWithoutComment[];
}

export type ContributionWithoutComment = {
  id: number;
  title: string,
  description: string,
  faculty: string;
  contributor: string;
  created_at: string,
}

export type Setting = {
  academic_year: string,
  closure_date: Date,
  final_closure_date: Date,
}

export type ContributionChartData = {
  name: string;
  value: number;
};

export type ContributionDataByFaculty = {
  name: string;
  year: number;
  value: number;
  percentage: number;
  contributors: number;
};

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

export interface GetFacultiesType extends TimeStamps  {
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

// Log Management

export interface GetLogsType extends TimeStamps  {
  id: number;
  table_name: string;
  action_type: string;
  user_id: number;
  ip_address: string;
  user_agent: string;
  success: boolean,
  message: string,
  user: User;
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

export interface GetSettingType extends TimeStamps {
  id: number;
  academic_year: string;
  closure_date: Date;
  final_closure_date: Date;
}

export interface UpdateSettingPayloadType {
  id: number;
  academic_year: string;
  closure_date: Date;
  final_closure_date: Date;
  updateby: number;
}

export interface PostResponse {
  data: string
  status: number
  message: string
}