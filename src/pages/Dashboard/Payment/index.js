import PaymentOptions from "../../../components/PaymentOptions";
import PaymentBooking from "../../../components/PaymentBooking";
import { useEffect, useState, useContext } from "react";
import useApi from "../../../hooks/useApi";
import UserContext from "../../../contexts/UserContext";

export default function Payment() {
  const [paymentBooking, setPaymentBooking] = useState(false);
  const { payment } = useApi();
  const { userData } = useContext(UserContext);

  useEffect(() => {
    payment.getPaymentInformations(userData.user.id).then(response => {
      if (response.status !== 200) {
        return;
      }
      if (response.data.purchase) {
        setPaymentBooking(true);
      }
    });
  }, []);

  return (
    <>{paymentBooking === true ? <PaymentBooking /> : <PaymentOptions />}</>
  );
}
