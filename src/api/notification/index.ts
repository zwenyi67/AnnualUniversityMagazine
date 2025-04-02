import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import axios from "axios";
import { NotificationType } from "./types";

const NOTIFICATION_URL = "/user";

export const getCoordinatorNotifications = {
  useQuery: (opt?: UseQueryOptions<NotificationType[], Error>) =>
    useQuery<NotificationType[], Error>({
      queryKey: ["getCoordinatorNotifications"],
      queryFn: async () => {
        const response = await axios.get(`${NOTIFICATION_URL}/notifications`);
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

export const markNotificationAsRead = {
  useMutation: (
    opt?: UseMutationOptions<
      unknown,
      Error,
      { notification_id: number; type: string }
    >
  ) => {
    return useMutation<
      unknown,
      Error,
      { notification_id: number; type: string }
    >({
      mutationFn: async (payload: {
        notification_id: number;
        type: string;
      }) => {
        const response = await axios.post(
          `${NOTIFICATION_URL}/notification/read`,
          payload
        );
        const { data, status, message } = response.data;
        console.log(data);
        if (status !== 0) {
          throw new Error(message);
        }
        return data;
      },
      ...opt,
    });
  },
};
