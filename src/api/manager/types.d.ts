import { TimeStamps } from "@/shared/types"

export type LoginPayload = {
    email: string
    password: string
}

export type LoginResponse = {
    token: string
    role: string
}

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

export type FileUploadResponse = {
    file: string
}