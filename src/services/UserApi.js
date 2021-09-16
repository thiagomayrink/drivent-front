import AuthenticatedApi from "./AuthenticatedApi";
import api from "./api";

export default class UserApi extends AuthenticatedApi {
  signUp(email, password) {
    return api.post("/users", { email, password });
  }
  
  forgotPassword(email) {
    return api.post("/users/password-recovery", { email });
  }

  changePassword(token, password) {
    return api.patch(`/users/change-password?token=${token}`, { password });
  }

  updatePhoto(photo) {
    return api.post("/users/photo", photo, {
      headers: {
        ...this.getAuthorizationHeader(),
      },
    });
  }
}
