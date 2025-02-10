import * as auth from "./auth";
import * as admin from "./admin";
import * as manager from "./manager";
import * as coordinator from "./coordinator";
import * as student from "./student";
import * as guest from "./guest";

class API {
  auth: typeof auth;
  admin: typeof admin;
  manager: typeof manager;
  coordinator: typeof coordinator;
  student: typeof student;
  guest: typeof guest;

  constructor() {
    this.auth = auth;
    this.admin = admin;
    this.manager = manager;
    this.coordinator = coordinator;
    this.student = student;
    this.guest = guest;
  }
}

const api = new API();

export default api;
