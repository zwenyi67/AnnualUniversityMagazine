import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import axios from "axios"
import { DashboardDataType, SelectedArticlesType } from "./types";

const Articles_URL = "/manager/selectedArticles"
const Dashboard_URL = "/manager/dashboard"

export const getSelectedArticles = {
	useQuery: (opt?: UseQueryOptions<SelectedArticlesType[], Error>) =>
		useQuery<SelectedArticlesType[], Error>({
			queryKey: ["getSelectedArticles"],
			queryFn: async () => {
				const response = await axios.get(`${Articles_URL}`);

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
