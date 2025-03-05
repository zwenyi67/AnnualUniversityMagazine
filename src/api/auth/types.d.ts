export type LoginPayload = {
    email: string
    password: string
}

export type LoginResponse = {
    token: string
    role: string
    user: UserData;
}

export type FileUploadResponse = {
    file: string
}

export type UserData = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    profile?: string;
    role_id: number;
    role_name: string;
    faculty_id?: number;
    faculty_name?: string;
    is_password_change?: boolean;
    last_login_at?: Date;
    last_login_ip?: string;
}

export interface PasswordUpdatePayload {
    user_id: number;
    old_password: string;
    new_password: string;
    confirm_password: string;
    updateby: number;
} 