import AuthenticatedApi from "./AuthenticatedApi";
import api from "./api";

export default class PaymentApi extends AuthenticatedApi {
  save(body) {
    return api.post("/payment", body, {
      headers: {
        ...this.getAuthorizationHeader(),
      },
    });
  }

  getPaymentInformativos() {
    return api.get("/payment", {
      headers: {
        ...this.getAuthorizationHeader(),
      },
    });
  }
}
