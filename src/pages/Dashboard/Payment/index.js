import { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import PaymentOptions from "../../../components/PaymentOptions";
import PaymentPage from "../../../components/PaymentPage";
import UserContext from "../../../contexts/UserContext";
import useApi from "../../../hooks/useApi";

export default function Payment() {
  const { payment } = useApi();
  const { userData, setUserData } = useContext(UserContext);
  const [paymentBooking, setPaymentBooking] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentDone, setPaymentDone] = useState(false);

  useEffect(() => {
    payment.getPaymentInformations(userData.user.id).then((response) => {
      if (!response.data?.purchase) return;

      const {
        userId,
        accommodationId,
        modalityId,
        enrollmentId,
        totalPrice,
        paymentDone,
        accommodation: { name: accomodationName },
        modality: { name: modalityName },
      } = response.data?.purchase;

      if (
        !userData.accommodationId ||
        !userData.modalityId ||
        !userData.userId ||
        !userData.enrollmentId
      ) {
        setUserData({
          ...userData,
          userId,
          accommodationId,
          modalityId,
          enrollmentId,
          accomodationName,
          modalityName,
        });
      }

      setTotalPrice(totalPrice);
      setPaymentDone(paymentDone);

      if (accommodationId && modalityId && enrollmentId) {
        setPaymentBooking(true);
      }
    });

    payment.getPaymentInformations(userData.user.id).catch((err) => {
      toast(err.response.status);
    });
  }, []);
  return (
    <>
      {paymentBooking === true ? (
        <PaymentPage
          userId={userData.user.id}
          totalPrice={totalPrice}
          accomodationName={userData?.accomodationName}
          modalityName={userData?.modalityName}
          paymentDone={paymentDone}
        />
      ) : (
        <PaymentOptions userId={userData.user.id} />
      )}
    </>
  );
}
