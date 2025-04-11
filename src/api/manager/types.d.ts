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
}

export type FileUploadResponse = {
    file: string
}