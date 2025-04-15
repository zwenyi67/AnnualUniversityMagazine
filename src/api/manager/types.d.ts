import { TimeStamps } from "@/shared/types"

export type LoginPayload = {
    email: string
    password: string
}

export type LoginResponse = {
    token: string
    role: string
}

// Dashboard Data

export type DashboardDataType = {
    coordinators: number;
    students: number;
    guests: number;
    faculties: number;
    contributions: number;
    approved: number;
    pending: number;
    reviewed: number;
    unreviewed: number;
    rejected: number;
    setting: Setting;
    contributionData: ContributionChartData[];
    contributionDataByFaculty: ContributionDataByFaculty[];
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
    value: number;
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

export type FileUploadResponse = {
    file: string
}