import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from "@tanstack/react-query"
import axios from "axios"
import { AddGuestPayloadType, getGuestsType, PostResponse, UpdateGuestPayloadType } from "./types";

const Guest_URL = "/admin/guest-users"

// Guest Management API

export const getGuests = {
	useQuery: (opt?: UseQueryOptions<getGuestsType[], Error>) =>
		useQuery<getGuestsType[], Error>({
			queryKey: ["getGuests"],
			queryFn: async () => {
				const response = await axios.get(`${Guest_URL}`);

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

export const addGuest = {
	useMutation: (
		opt?: UseMutationOptions<
			PostResponse,
			Error,
			AddGuestPayloadType,
			unknown
		>
	) => {
		return useMutation({
			mutationKey: ["addGuest"],
			mutationFn: async (payload: AddGuestPayloadType) => {
				const response = await axios.post(
					`${Guest_URL}/create`,
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

export const updateGuest = {
	useMutation: (
		opt?: UseMutationOptions<
			PostResponse,
			Error,
			UpdateGuestPayloadType,
			unknown
		>
	) => {
		return useMutation({
			mutationKey: ["updateGuest"],
			mutationFn: async (payload: UpdateGuestPayloadType) => {
				const response = await axios.post(
					`${Guest_URL}/edit`,
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

export const deleteGuest = {
	useMutation: (
		opt?: UseMutationOptions<
			PostResponse,
			Error,
			number,
			unknown
		>
	) => {
		return useMutation({
			mutationKey: ["deleteGuest"],
			mutationFn: async (id: number) => {
				const response = await axios.post(
					`${Guest_URL}/${id}/delete`
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
