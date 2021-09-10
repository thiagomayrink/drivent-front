import NoSubscriptionDone from "../../../components/Hotel/NoSubscriptionDone";
import OnlineChoose from "../../../components/Hotel/OnlineChoose";
import NoPaymentDone from "../../../components/Hotel/NoPaymentDone";
import Hotel from "../../../components/Hotel";

import { useEffect, useState, useContext } from "react";
import useApi from "../../../hooks/useApi";
import UserContext from "../../../contexts/UserContext";
import DashboardContext from "../../../contexts/DashboardContext";

import Typography from "@material-ui/core/Typography";
import styled from "styled-components";

export default function HotelIntegration() {
  const [subscriptionDone, setSubscriptionDone] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  const [onlineChoose, setOnlineChoose] = useState(false);
  const { payment } = useApi();
  const { userData } = useContext(UserContext);
  const { dashboardData } = useContext(DashboardContext);

  useEffect(() => {
    if (dashboardData.subscriptionDone === true) {
      setSubscriptionDone(true);
    }

    payment.getPaymentInformations(userData.user.id).then(response => {
      console.log(response.data);
      if (response.status !== 200) {
        return;
      }
      if (response.data.purchase) {
        if (response.data.purchase.modalityId === 2) {
          setOnlineChoose(true);
        }
        if (response.data.purchase.paymentDone === true) {
          setPaymentDone(true);
        }
      }
    });
  }, []);

  return (
    <HotelContainer>
      <StyledHeader variant="h4"> Escolha de hotel e quarto</StyledHeader>
      <div>
        {subscriptionDone === false ? (
          <NoSubscriptionDone />
        ) : onlineChoose === true ? (
          <OnlineChoose />
        ) : paymentDone === false ? (
          <NoPaymentDone />
        ) : (
          <Hotel />
        )}
      </div>
    </HotelContainer>
  );
}

const HotelContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  > div {
    font-size: 34px;
    line-height: 40px;
    height: 100%;
    display: flex;
  }
`;
const StyledHeader = styled(Typography)`
  margin-bottom: 36px !important;
`;
