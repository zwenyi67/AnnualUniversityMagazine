import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from "@tanstack/react-query"
import axios from "axios"
import { AddFacultyPayloadType, GetFacultiesType, PostResponse, UpdateFacultyPayloadType } from "./types";

const Faculty_URL = "/admin/faculties"

// Faculty Management API

export const getFaculties = {
	useQuery: (opt?: UseQueryOptions<GetFacultiesType[], Error>) =>
		useQuery<GetFacultiesType[], Error>({
			queryKey: ["getFaculties"],
			queryFn: async () => {
				const response = await axios.get(`${Faculty_URL}`);

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

export const addFaculty = {
	useMutation: (
		opt?: UseMutationOptions<
			PostResponse,
			Error,
			AddFacultyPayloadType,
			unknown
		>
	) => {
		return useMutation({
			mutationKey: ["addFaculty"],
			mutationFn: async (payload: AddFacultyPayloadType) => {
				const response = await axios.post(
					`${Faculty_URL}/create`,
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

export const updateFaculty = {
	useMutation: (
		opt?: UseMutationOptions<
			PostResponse,
			Error,
			UpdateFacultyPayloadType,
			unknown
		>
	) => {
		return useMutation({
			mutationKey: ["updateFaculty"],
			mutationFn: async (payload: UpdateFacultyPayloadType) => {
				const response = await axios.post(
					`${Faculty_URL}/edit`,
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

export const deleteFaculty = {
	useMutation: (
		opt?: UseMutationOptions<
			PostResponse,
			Error,
			number,
			unknown
		>
	) => {
		return useMutation({
			mutationKey: ["deleteFaculty"],
			mutationFn: async (id: number) => {
				const response = await axios.post(
					`${Faculty_URL}/${id}/delete`
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