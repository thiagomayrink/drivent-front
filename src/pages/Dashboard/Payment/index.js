import PaymentOptions from "../../../components/PaymentOptions";
import PaymentBooking from "../../../components/PaymentBooking";
import NoSubscriptionDone from "../../../components/PaymentOptions/NoSubscriptionDone";
import { useEffect, useState, useContext } from "react";
import useApi from "../../../hooks/useApi";
import UserContext from "../../../contexts/UserContext";
import DashboardContext from "../../../contexts/DashboardContext";

import Typography from "@material-ui/core/Typography";
import styled from "styled-components";

export default function Payment() {
  const [subscriptionDone, setSubscriptionDone] = useState(false);
  const [paymentBooking, setPaymentBooking] = useState(false);
  const { payment } = useApi();
  const { userData } = useContext(UserContext);
  const { dashboardData } = useContext(DashboardContext);

  useEffect(() => {
    if (dashboardData.subscriptionDone === true) {
      setSubscriptionDone(true);
    }

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
    <PaymentContainer>
      <StyledHeader variant="h4"> Ingresso e pagamento</StyledHeader>
      <div>
        {subscriptionDone === false ? (
          <NoSubscriptionDone />
        ) : paymentBooking === true ? (
          <PaymentBooking />
        ) : (
          <PaymentOptions />
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
