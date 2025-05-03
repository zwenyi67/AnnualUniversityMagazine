import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import axios from "axios";
import { GuestType, SelectedArticlesType } from "./types";

const GUEST_URL = "/coordinator/guests";
const Article_URL = "/guest/articles";

export const getGuest = {
  useQuery: (opt?: UseQueryOptions<GuestType[], Error>) =>
    useQuery<GuestType[], Error>({
      queryKey: ["getGuests"],
      queryFn: async () => {
        const response = await axios.get(`${GUEST_URL}`);
        const { data, status, message } = response.data;
        console.log(data);
        if (status !== 0) {
          throw new Error(message);
        }

        return data;
      },
      refetchOnWindowFocus: false,
      retry: 1,
      throwOnError: true,
      ...opt,
    }),
};

export const getSelectedArticles = {
  useQuery: (opt?: UseQueryOptions<SelectedArticlesType[], Error>) =>
    useQuery<SelectedArticlesType[], Error>({
      queryKey: ["getSelectedArticles"],
      queryFn: async () => {
        const response = await axios.get(`${Article_URL}`);

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