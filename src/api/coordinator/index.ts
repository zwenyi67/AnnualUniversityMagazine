import {
  useQuery,
  UseQueryOptions,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";
import axios from "axios";
import {
  CommentResponse,
  CoordinatorsType,
  ArticleResponse,
  DashboardType,
} from "./types";
import { StudentType } from "../student/types";

const BASE_URL = "/coordinator";
const CONTRIBUTION_URL = BASE_URL + "/contributions";
const REVIEW_URL = BASE_URL + "/review";
const SELECT_URL = BASE_URL + "/select";
const CONTRIBUTION_DETAIL_URL = BASE_URL + "/detail";
const CONTRIBUTION_COMMENT_URL = BASE_URL + "/comment/add";
const DASHBOARD_URL = BASE_URL + "/dashboard";

// Type for contribution ID payload
interface ContributionIdPayload {
  contribution_id: number;
}

export const getContribution = {
  useQuery: (opt?: UseQueryOptions<ArticleResponse, Error>) =>
    useQuery<ArticleResponse, Error>({
      queryKey: ["getContributions"],
      queryFn: async () => {
        const response = await axios.get(`${CONTRIBUTION_URL}`);
        const { data, status, message } = response.data;
        if (status !== 0) {
          throw new Error(message);
        }
        return {
          systemSetting: data.systemSetting,
          contributions: data.contributions
        } as ArticleResponse;
      },
      refetchOnWindowFocus: false,
      retry: 1,
      throwOnError: true,
      ...opt,
    }),
};

export const getContributionDetail = {
  useQuery: (id: number, opt?: UseQueryOptions<CoordinatorsType, Error>) =>
    useQuery<CoordinatorsType, Error>({
      queryKey: ["getContributionDetail", id],
      queryFn: async () => {
        const response = await axios.get(`${CONTRIBUTION_DETAIL_URL}/${id}`);
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

export const reviewContribution = {
  useMutation: (opt?: UseMutationOptions<void, Error, ContributionIdPayload>) =>
    useMutation<void, Error, ContributionIdPayload>({
      mutationFn: async (payload: ContributionIdPayload) => {
        const response = await axios.post(`${REVIEW_URL}`, payload);
        const { data, status, message } = response.data;

        if (status !== 0) {
          throw new Error(message);
        }

        return data;
      },
      ...opt,
    }),
};

export const selectContribution = {
  useMutation: (opt?: UseMutationOptions<void, Error, ContributionIdPayload>) =>
    useMutation<void, Error, ContributionIdPayload>({
      mutationFn: async (payload: ContributionIdPayload) => {
        const response = await axios.post(`${SELECT_URL}`, payload);
        const { data, status, message } = response.data;

        if (status !== 0) {
          throw new Error(message);
        }

        return data;
      },
      ...opt,
    }),
};

export const addComment = {
  useMutation: (
    opt?: UseMutationOptions<
      CommentResponse,
      Error,
      { contribution_id: number; comment: string }
    >
  ) =>
    useMutation<
      CommentResponse,
      Error,
      { contribution_id: number; comment: string }
    >({
      mutationFn: async (payload: {
        contribution_id: number;
        comment: string;
      }) => {
        const response = await axios.post(
          `${CONTRIBUTION_COMMENT_URL}`,
          payload
        );
        const { data, status, message } = response.data;

        if (status !== 0) {
          throw new Error(message);
        }

        return data;
      },
      ...opt,
    }),
};

export const getDashboard = {
  useQuery: (opt?: UseQueryOptions<DashboardType, Error>) =>
    useQuery<DashboardType, Error>({
      queryKey: ["getDashboard"],
      queryFn: async () => {
        const response = await axios.get(`${DASHBOARD_URL}`);
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

export const getStudents = {
  useQuery: (opt?: UseQueryOptions<StudentType[], Error>) =>
    useQuery<StudentType[], Error>({
      queryKey: ["getStudents"],
      queryFn: async () => {
        const response = await axios.get(`${BASE_URL}/students`);
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
