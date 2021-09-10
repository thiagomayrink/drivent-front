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

  process(body) {
    return api.post("/payment/pay", body, {
      headers: {
        ...this.getAuthorizationHeader(),
      },
    });
  }

  getPaymentInformations(id) {
    return api.get(`/payment/${id}`, {
      headers: {
        ...this.getAuthorizationHeader(),
      },
    });
  }
}
