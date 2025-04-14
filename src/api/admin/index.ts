import * as adminUsers from "./admin-user";
import * as managerUsers from "./manager-user";
import * as coordinatorUsers from "./coordinator-user";
import * as studentUsers from "./student-user";
import * as guestUsers from "./guest-user";
import * as faculties from "./faculty";
import * as logs from "./log";
import * as setting from "./system-setting";
import * as dashboard from "./dashboard";


export const admin = {
	dashboard,
	adminUsers,
	managerUsers,
	coordinatorUsers,
	studentUsers,
	guestUsers,
	faculties,
	logs,
	setting,
};

export type AdminAPI = typeof admin;

