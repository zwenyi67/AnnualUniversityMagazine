export type LoginPayload = {
    username: string
    password: string
}

export type LoginResponse = {
    token: string
    role: string
}

export type FileUploadResponse = {
    file: string
}