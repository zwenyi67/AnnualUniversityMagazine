import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from "@tanstack/react-query"
import axios from "axios"
import { GetSettingType, PostResponse, UpdateSettingPayloadType } from "./types";

const setting_URL = "/admin/setting"

// System Setting Management API

export const getSetting = {
	useQuery: (opt?: UseQueryOptions<GetSettingType, Error>) =>
		useQuery<GetSettingType, Error>({
			queryKey: ["getSetting"],
			queryFn: async () => {
				const response = await axios.get(`${setting_URL}`);

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

export const updateSetting = {
	useMutation: (
		opt?: UseMutationOptions<
			PostResponse,
			Error,
			UpdateSettingPayloadType,
			unknown
		>
	) => {
		return useMutation({
			mutationKey: ["updateSetting"],
			mutationFn: async (payload: UpdateSettingPayloadType) => {
				const response = await axios.post(
					`${setting_URL}/edit`,
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