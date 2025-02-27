import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from "@tanstack/react-query"
import axios from "axios"
import { AddFacultyPayloadType, AddManagerPayloadType, GetFacultiesType, getManagersType, PostResponse, UpdateFacultyPayloadType, UpdateManagerPayloadType } from "./types";

const Faculty_URL = "/admin/faculties"
const Manager_URL = "/admin/manager-users"

  export const getManagers = {
	useQuery: (opt?: UseQueryOptions<getManagersType[], Error>) =>
	  useQuery<getManagersType[], Error>({
		queryKey: ["getManagers"],
		queryFn: async () => {
		  const response = await axios.get(`${Manager_URL}`);
  
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

  export const addManager = {
	useMutation: (
	  opt?: UseMutationOptions<
		PostResponse,
		Error,
		AddManagerPayloadType,
		unknown
	  >
	) => {
	  return useMutation({
		mutationKey: ["addManager"],
		mutationFn: async (payload: AddManagerPayloadType) => {
		  const response = await axios.post(
			`${Manager_URL}/create`,
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

  export const updateManager = {
	useMutation: (
	  opt?: UseMutationOptions<
		PostResponse,
		Error,
		UpdateManagerPayloadType,
		unknown
	  >
	) => {
	  return useMutation({
		mutationKey: ["updateManager"],
		mutationFn: async (payload: UpdateManagerPayloadType) => {
		  const response = await axios.post(
			`${Manager_URL}/edit`,
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

  export const deleteManager = {
	useMutation: (
	  opt?: UseMutationOptions<
		PostResponse,
		Error,
		number,
		unknown
	  >
	) => {
	  return useMutation({
		mutationKey: ["deleteManager"],
		mutationFn: async (id: number) => {
		  const response = await axios.post(
			`${Manager_URL}/${id}/delete`
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




export const getFaculties = {
	useQuery: (opt?: UseQueryOptions<GetFacultiesType[], Error>) =>
	  useQuery<GetFacultiesType[], Error>({
		queryKey: ["getFaculties"],
		queryFn: async () => {
		  const response = await axios.get(`${Faculty_URL}`);
  
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
  
  export const addFaculty = {
	useMutation: (
	  opt?: UseMutationOptions<
		PostResponse,
		Error,
		AddFacultyPayloadType,
		unknown
	  >
	) => {
	  return useMutation({
		mutationKey: ["addFaculty"],
		mutationFn: async (payload: AddFacultyPayloadType) => {
		  const response = await axios.post(
			`${Faculty_URL}/create`,
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
  
  export const updateFaculty = {
	useMutation: (
	  opt?: UseMutationOptions<
		PostResponse,
		Error,
		UpdateFacultyPayloadType,
		unknown
	  >
	) => {
	  return useMutation({
		mutationKey: ["updateFaculty"],
		mutationFn: async (payload: UpdateFacultyPayloadType) => {
		  const response = await axios.post(
			`${Faculty_URL}/edit`,
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
  
  export const deleteFaculty = {
	useMutation: (
	  opt?: UseMutationOptions<
		PostResponse,
		Error,
		number,
		unknown
	  >
	) => {
	  return useMutation({
		mutationKey: ["deleteFaculty"],
		mutationFn: async (id: number) => {
		  const response = await axios.post(
			`${Faculty_URL}/${id}/delete`
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
