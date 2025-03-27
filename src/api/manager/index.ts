import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import axios from "axios"
import { SelectedArticlesType } from "./types";

const Articles_URL = "/manager/selectedArticles"

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
