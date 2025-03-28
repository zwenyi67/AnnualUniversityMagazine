import * as adminUsers from "./admin-user";
import * as managerUsers from "./manager-user";
import * as coordinatorUsers from "./coordinator-user";
import * as studentUsers from "./student-user";
import * as guestUsers from "./guest-user";
import * as faculties from "./faculty";

export const admin = {
	adminUsers,
	managerUsers,
	coordinatorUsers,
	studentUsers,
	guestUsers,
	faculties,
};

export type AdminAPI = typeof admin;

