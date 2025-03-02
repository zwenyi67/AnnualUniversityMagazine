import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from "@tanstack/react-query"
import axios from "axios"
import { AddAdminPayloadType, getAdminsType, PostResponse, UpdateAdminPayloadType } from "./types";

const Admin_URL = "/admin/admin-users"

// Admin Management API

export const getAdmins = {
	useQuery: (opt?: UseQueryOptions<getAdminsType[], Error>) =>
		useQuery<getAdminsType[], Error>({
			queryKey: ["getAdmins"],
			queryFn: async () => {
				const response = await axios.get(`${Admin_URL}`);

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

export const addAdmin = {
    useMutation: (
        opt?: UseMutationOptions<
            PostResponse,
            Error,
            AddAdminPayloadType,
            unknown
        >
    ) => {
        return useMutation({
            mutationKey: ["addAdmin"],
            mutationFn: async (payload: AddAdminPayloadType) => {
                const response = await axios.post(
                    `${Admin_URL}/create`,
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

export const updateAdmin = {
    useMutation: (
        opt?: UseMutationOptions<
            PostResponse,
            Error,
            UpdateAdminPayloadType,
            unknown
        >
    ) => {
        return useMutation({
            mutationKey: ["updateAdmin"],
            mutationFn: async (payload: UpdateAdminPayloadType) => {
                const response = await axios.post(
                    `${Admin_URL}/edit`,
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

export const deleteAdmin = {
    useMutation: (
        opt?: UseMutationOptions<
            PostResponse,
            Error,
            number,
            unknown
        >
    ) => {
        return useMutation({
            mutationKey: ["deleteAdmin"],
            mutationFn: async (id: number) => {
                const response = await axios.post(
                    `${Admin_URL}/${id}/delete`
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