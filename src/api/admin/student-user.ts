import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from "@tanstack/react-query"
import axios from "axios"
import { AddStudentPayloadType, getStudentsType, PostResponse, UpdateStudentPayloadType } from "./types";

const Student_URL = "/admin/student-users"

// Student Management API

export const getStudents = {
    useQuery: (opt?: UseQueryOptions<getStudentsType[], Error>) =>
        useQuery<getStudentsType[], Error>({
            queryKey: ["getStudents"],
            queryFn: async () => {
                const response = await axios.get(`${Student_URL}`);

                const { data, status, message } = response.data;

                if (status !== 0) {
                    throw new Error(message);
                }

                return data;
            },
            throwOnError: true,
            ...opt,
        }),
};

export const addStudent = {
    useMutation: (
        opt?: UseMutationOptions<
            PostResponse,
            Error,
            AddStudentPayloadType,
            unknown
        >
    ) => {
        return useMutation({
            mutationKey: ["addStudent"],
            mutationFn: async (payload: AddStudentPayloadType) => {
                const response = await axios.post(
                    `${Student_URL}/create`,
                    payload
                )

                const { data, status, message } = response.data

                if (status !== 0) {
                    throw new Error(
                        message ||
                        "An error occurred while processing the request."
                    )
                }

                return data
            },
            ...opt,
        })
    },
}

export const updateStudent = {
    useMutation: (
        opt?: UseMutationOptions<
            PostResponse,
            Error,
            UpdateStudentPayloadType,
            unknown
        >
    ) => {
        return useMutation({
            mutationKey: ["updateStudent"],
            mutationFn: async (payload: UpdateStudentPayloadType) => {
                const response = await axios.post(
                    `${Student_URL}/edit`,
                    payload
                )

                const { data, status, message } = response.data

                if (status !== 0) {
                    throw new Error(
                        message ||
                        "An error occurred while processing the request."
                    )
                }

                return data
            },
            ...opt,
        })
    },
}

export const deleteStudent = {
    useMutation: (
        opt?: UseMutationOptions<
            PostResponse,
            Error,
            number,
            unknown
        >
    ) => {
        return useMutation({
            mutationKey: ["deleteStudent"],
            mutationFn: async (id: number) => {
                const response = await axios.post(
                    `${Student_URL}/${id}/delete`
                );

                const { data, status, message } = response.data;

                if (status !== 0) {
                    throw new Error(
                        message || "An error occurred while processing the request."
                    );
                }

                return data;
            },
            ...opt,
        });
    },
};