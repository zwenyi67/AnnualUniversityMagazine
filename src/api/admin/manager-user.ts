import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from "@tanstack/react-query"
import axios from "axios"
import { AddManagerPayloadType, getManagersType, PostResponse, UpdateManagerPayloadType } from "./types";

const Manager_URL = "/admin/manager-users"

// Manager Management API

export const getManagers = {
	useQuery: (opt?: UseQueryOptions<getManagersType[], Error>) =>
		useQuery<getManagersType[], Error>({
			queryKey: ["getManagers"],
			queryFn: async () => {
				const response = await axios.get(`${Manager_URL}`);

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

export const addManager = {
	useMutation: (
		opt?: UseMutationOptions<
			PostResponse,
			Error,
			AddManagerPayloadType,
			unknown
		>
	) => {
		return useMutation({
			mutationKey: ["addManager"],
			mutationFn: async (payload: AddManagerPayloadType) => {
				const response = await axios.post(
					`${Manager_URL}/create`,
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

export const updateManager = {
	useMutation: (
		opt?: UseMutationOptions<
			PostResponse,
			Error,
			UpdateManagerPayloadType,
			unknown
		>
	) => {
		return useMutation({
			mutationKey: ["updateManager"],
			mutationFn: async (payload: UpdateManagerPayloadType) => {
				const response = await axios.post(
					`${Manager_URL}/edit`,
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

export const deleteManager = {
	useMutation: (
		opt?: UseMutationOptions<
			PostResponse,
			Error,
			number,
			unknown
		>
	) => {
		return useMutation({
			mutationKey: ["deleteManager"],
			mutationFn: async (id: number) => {
				const response = await axios.post(
					`${Manager_URL}/${id}/delete`
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