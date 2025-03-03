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
    first_name: string;
    last_name: string;
}