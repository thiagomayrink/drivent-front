import PaymentOptions from "../../../components/PaymentOptions";
import NoSubscriptionDone from "../../../components/PaymentOptions/NoSubscriptionDone";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import PaymentPage from "../../../components/PaymentPage";
import UserContext from "../../../contexts/UserContext";
import useApi from "../../../hooks/useApi";

export default function Payment() {
  const { payment } = useApi();
  const { userData, setUserData } = useContext(UserContext);
  const [paymentBooking, setPaymentBooking] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentDone, setPaymentDone] = useState(false);
  const [subscriptionDone, setSubscriptionDone] = useState(false);

  useEffect(() => {
    payment.getPaymentInformations(userData.user.id).then((response) => {
      if(userData?.subscriptionDone) {
        setSubscriptionDone(true);
      }
      if(!response.data.purchase) {
        return;
      }
      setSubscriptionDone(true);
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
        setTotalPrice(totalPrice);
        setPaymentDone(paymentDone);
      }

      if (accommodationId && modalityId && enrollmentId) {
        setTotalPrice(totalPrice);
        setPaymentDone(paymentDone);
        setPaymentBooking(true);
      }
    });

    payment.getPaymentInformations(userData.user.id).catch((err) => {
      toast(err.response.status);
    });
  }, []);

  return (
    <PaymentContainer>
      <StyledHeader variant="h4"> Ingresso e pagamento</StyledHeader>
      <div>
        {subscriptionDone === false ? (
          <NoSubscriptionDone />
        ) : paymentBooking === true ? (
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
      </div>
    </PaymentContainer>
  );
}

const PaymentContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  > div {
    height: 100%;
  }
`;
const StyledHeader = styled(Typography)`
  margin-bottom: 36px !important;
`;
