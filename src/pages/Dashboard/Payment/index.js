import { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import PaymentOptions from "../../../components/PaymentOptions";
import PaymentPage from "../../../components/PaymentPage";
import UserContext from "../../../contexts/UserContext";
import useApi from "../../../hooks/useApi";

export default function Payment() {
  const [paymentBooking, setPaymentBooking] = useState(false);
  const { payment } = useApi();
  const { userData, setUserData } = useContext(UserContext);
  const { ticket } = userData;

  useEffect(() => {
    payment.getPaymentInformations(userData.enrollmentId).then((response) => {
      const { accommodationId, modalityId, enrollmentId } = response.data;
      if (accommodationId && modalityId) {
        setUserData({
          ...userData,
          ticket: {
            accommodationId: accommodationId,
            modalityId: modalityId,
          },
          enrollmentId: enrollmentId,
        });
      }

      const purchaseId = response?.data?.purchaseId;
      if (!!purchaseId) {
        setUserData({ ...userData, purchaseId: purchaseId });
        setPaymentBooking(true);
      }
    });
    payment.getPaymentInformations().catch((err) => {
      toast(err.response.status);
    });
  }, []);

  return (
    <>
      {paymentBooking === true ? (
        <PaymentPage />
      ) : (
        <PaymentOptions enrollmentId={userData.enrollmentId} />
      )}
    </>
  );
}
