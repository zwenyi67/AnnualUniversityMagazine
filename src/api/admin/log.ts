import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import axios from "axios"
import { GetLogsType } from "./types";

const Log_URL = "/admin/logs"

// Faculty Management API

export const getLogs = {
	useQuery: (opt?: UseQueryOptions<GetLogsType[], Error>) =>
		useQuery<GetLogsType[], Error>({
			queryKey: ["getLogs"],
			queryFn: async () => {
				const response = await axios.get(`${Log_URL}`);

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
