import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from "@tanstack/react-query"
import axios from "axios"
import { AddCoordinatorPayloadType, AddFacultyPayloadType, AddManagerPayloadType, AddStudentPayloadType, getAdminsType, getCoordinatorsType, GetFacultiesType, getManagersType, getStudentsType, PostResponse, UpdateCoordinatorPayloadType, UpdateFacultyPayloadType, UpdateManagerPayloadType, UpdateStudentPayloadType } from "./types";

const Admin_URL = "/admin/admin-users"
const Manager_URL = "/admin/manager-users"
const Coordinator_URL = "/admin/coordinator-users"
const Student_URL = "/admin/student-users"

const Faculty_URL = "/admin/faculties"


// Admin Management API

export const getAdmins = {
	useQuery: (opt?: UseQueryOptions<getAdminsType[], Error>) =>
		useQuery<getAdminsType[], Error>({
			queryKey: ["getAdmins"],
			queryFn: async () => {
				const response = await axios.get(`${Admin_URL}`);

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

// Manager Management API

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

// Coordinator Management API

export const getCoordinators = {
	useQuery: (opt?: UseQueryOptions<getCoordinatorsType[], Error>) =>
		useQuery<getCoordinatorsType[], Error>({
			queryKey: ["getCoordinators"],
			queryFn: async () => {
				const response = await axios.get(`${Coordinator_URL}`);

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

export const addCoordinator = {
	useMutation: (
		opt?: UseMutationOptions<
			PostResponse,
			Error,
			AddCoordinatorPayloadType,
			unknown
		>
	) => {
		return useMutation({
			mutationKey: ["addCoordinator"],
			mutationFn: async (payload: AddCoordinatorPayloadType) => {
				const response = await axios.post(
					`${Coordinator_URL}/create`,
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

export const updateCoordinator = {
	useMutation: (
		opt?: UseMutationOptions<
			PostResponse,
			Error,
			UpdateCoordinatorPayloadType,
			unknown
		>
	) => {
		return useMutation({
			mutationKey: ["updateCoordinator"],
			mutationFn: async (payload: UpdateCoordinatorPayloadType) => {
				const response = await axios.post(
					`${Coordinator_URL}/edit`,
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

export const deleteCoordinator = {
	useMutation: (
		opt?: UseMutationOptions<
			PostResponse,
			Error,
			number,
			unknown
		>
	) => {
		return useMutation({
			mutationKey: ["deleteCoordinator"],
			mutationFn: async (id: number) => {
				const response = await axios.post(
					`${Coordinator_URL}/${id}/delete`
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

// Student Management API

export const getStudents = {
	useQuery: (opt?: UseQueryOptions<getStudentsType[], Error>) =>
		useQuery<getStudentsType[], Error>({
			queryKey: ["getStudents"],
			queryFn: async () => {
				const response = await axios.get(`${Student_URL}`);

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

export const addStudent = {
	useMutation: (
		opt?: UseMutationOptions<
			PostResponse,
			Error,
			AddStudentPayloadType,
			unknown
		>
	) => {
		return useMutation({
			mutationKey: ["addStudent"],
			mutationFn: async (payload: AddStudentPayloadType) => {
				const response = await axios.post(
					`${Student_URL}/create`,
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

export const updateStudent = {
	useMutation: (
		opt?: UseMutationOptions<
			PostResponse,
			Error,
			UpdateStudentPayloadType,
			unknown
		>
	) => {
		return useMutation({
			mutationKey: ["updateStudent"],
			mutationFn: async (payload: UpdateStudentPayloadType) => {
				const response = await axios.post(
					`${Student_URL}/edit`,
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

export const deleteStudent = {
	useMutation: (
		opt?: UseMutationOptions<
			PostResponse,
			Error,
			number,
			unknown
		>
	) => {
		return useMutation({
			mutationKey: ["deleteStudent"],
			mutationFn: async (id: number) => {
				const response = await axios.post(
					`${Student_URL}/${id}/delete`
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

// Faculty Management API

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
