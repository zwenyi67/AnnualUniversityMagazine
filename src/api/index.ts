import * as auth from "./auth";

class API {
  auth: typeof auth;



  constructor() {
    this.auth = auth;
  }
}

const api = new API();

export default api;
