import AuthenticatedApi from "./AuthenticatedApi";
import api from "./api";

export default class UserApi extends AuthenticatedApi {
  signUp(email, password) {
    return api.post("/users", { email, password });
  }
  
  forgotPassword(email) {
    return api.post("/users/password-recovery", { email });
  }

  updatePhoto(photo) {
    return api.post("/users/photo", photo, {
      headers: {
        ...this.getAuthorizationHeader(),
      },
    });
  }
}
