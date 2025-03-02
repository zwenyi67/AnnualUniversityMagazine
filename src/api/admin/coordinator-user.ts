import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from "@tanstack/react-query"
import axios from "axios"
import { AddCoordinatorPayloadType, getCoordinatorsType, PostResponse, UpdateCoordinatorPayloadType } from "./types";

const Coordinator_URL = "/admin/coordinator-users"

// Coordinator Management API

export const getCoordinators = {
	useQuery: (opt?: UseQueryOptions<getCoordinatorsType[], Error>) =>
		useQuery<getCoordinatorsType[], Error>({
			queryKey: ["getCoordinators"],
			queryFn: async () => {
				const response = await axios.get(`${Coordinator_URL}`);

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

export const addCoordinator = {
	useMutation: (
		opt?: UseMutationOptions<
			PostResponse,
			Error,
			AddCoordinatorPayloadType,
			unknown
		>
	) => {
		return useMutation({
			mutationKey: ["addCoordinator"],
			mutationFn: async (payload: AddCoordinatorPayloadType) => {
				const response = await axios.post(
					`${Coordinator_URL}/create`,
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

export const updateCoordinator = {
	useMutation: (
		opt?: UseMutationOptions<
			PostResponse,
			Error,
			UpdateCoordinatorPayloadType,
			unknown
		>
	) => {
		return useMutation({
			mutationKey: ["updateCoordinator"],
			mutationFn: async (payload: UpdateCoordinatorPayloadType) => {
				const response = await axios.post(
					`${Coordinator_URL}/edit`,
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

export const deleteCoordinator = {
	useMutation: (
		opt?: UseMutationOptions<
			PostResponse,
			Error,
			number,
			unknown
		>
	) => {
		return useMutation({
			mutationKey: ["deleteCoordinator"],
			mutationFn: async (id: number) => {
				const response = await axios.post(
					`${Coordinator_URL}/${id}/delete`
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