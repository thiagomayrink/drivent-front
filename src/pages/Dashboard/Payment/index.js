import { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import PaymentOptions from "../../../components/PaymentOptions";
import PaymentPage from "../../../components/PaymentPage";
import UserContext from "../../../contexts/UserContext";
import useApi from "../../../hooks/useApi";

export default function Payment() {
  const { userData, setUserData } = useContext(UserContext);
  const { payment } = useApi();

  useEffect(() => {
    payment.getPaymentInformations().then((response) => {
      const ticketId = response?.data?.ticketId;
      const purchaseId = response?.data?.purchaseId;
      if (!!ticketId) setUserData({ ...userData, ticketId: ticketId });
      if (!!purchaseId) setUserData({ ...userData, purchaseId: purchaseId });
    });
    payment.getPaymentInformations().catch((err) => {
      toast(err.response.status);
    });
  }, []);

  return <>{false ? <PaymentOptions /> : <PaymentPage />}</>;
}
