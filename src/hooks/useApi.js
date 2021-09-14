import EventApi from "../services/EventApi";
import UserApi from "../services/UserApi";
import AuthApi from "../services/auth";
import CepApi from "../services/CepApi";
import EnrollmentApi from "../services/EnrollmentApi";
import PaymentApi from "../services/PaymentApi";
import HotelApi from "../services/HotelApi";
import ActivityApi from "../services/ActivityApi";

export default function useApi() {
  return {
    event: new EventApi(),
    user: new UserApi(),
    auth: new AuthApi(),
    cep: new CepApi(),
    enrollment: new EnrollmentApi(),
    payment: new PaymentApi(),
    hotel: new HotelApi(),
    activity: new ActivityApi(),
  };
}
