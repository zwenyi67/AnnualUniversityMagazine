import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import axios from "axios"
import { DashboardDataType } from "./types";

const Dashboard_URL = "/admin/dashboard"

// Dashboard Data API

export const dashboardData = {
	useQuery: (opt?: UseQueryOptions<DashboardDataType, Error>) =>
		useQuery<DashboardDataType, Error>({
			queryKey: ["dashboardData"],
			queryFn: async () => {
				const response = await axios.get(`${Dashboard_URL}`);

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
