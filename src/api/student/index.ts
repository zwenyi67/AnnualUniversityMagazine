import type { ContributionType, UploadArticlePayload } from "./types";

import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import axios from "axios";
import { PostResponse } from "../admin/types";

const BASE_URL = "student";

export const getContributionsByStudentID = {
  useQuery: (opt?: UseQueryOptions<ContributionType[], Error>) =>
    useQuery<ContributionType[], Error>({
      queryKey: ["getContributionsByStudentID"],
      queryFn: async () => {
        const response = await axios.get(`${BASE_URL}/contributions`);

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

export const uploadArticle = {
  useMutation: (
    opt?: UseMutationOptions<PostResponse, Error, UploadArticlePayload, unknown>
  ) => {
    return useMutation({
      mutationKey: ["uploadArticle"],
      mutationFn: async (payload: UploadArticlePayload) => {
        const response = await axios.post(
          `${BASE_URL}/uploadArticle`,
          payload,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const { data, status, message } = response.data;
        console.log(status);
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

export const getCommentsByArticleID = {
  useQuery: (articleId: number, opt?: UseQueryOptions<any, Error>) =>
    useQuery<any, Error>({
      queryKey: ["getCommentsByArticleID"],
      queryFn: async () => {
        const response = await axios.get(
          `${BASE_URL}/articles/${articleId}/comments`
        );

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
