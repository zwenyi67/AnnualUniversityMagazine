import * as auth from "./auth";
import { admin, AdminAPI } from "./admin";
import * as manager from "./manager";
import * as coordinator from "./coordinator";
import * as student from "./student";
import * as guest from "./guest";
import * as notification from "./notification";

class API {
  auth: typeof auth;
  admin: AdminAPI;
  manager: typeof manager;
  coordinator: typeof coordinator;
  student: typeof student;
  guest: typeof guest;
  notification: typeof notification;

  constructor() {
    this.auth = auth;
    this.admin = admin;
    this.manager = manager;
    this.coordinator = coordinator;
    this.student = student;
    this.guest = guest;
    this.notification = notification;
  }
}

const api = new API();

export default api;
