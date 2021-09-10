import NoSubscriptionDone from "../../../components/Activity/NoSubscriptionDone";
import Activity from "../../../components/Activity";
import NoPaymentDone from "../../../components/Activity/NoPaymentDone";
import OnlineChoose from "../../../components/Activity/OnlineChoose";

import { useEffect, useState, useContext } from "react";
import useApi from "../../../hooks/useApi";
import UserContext from "../../../contexts/UserContext";
import DashboardContext from "../../../contexts/DashboardContext";

import Typography from "@material-ui/core/Typography";
import styled from "styled-components";

export default function Activities() {
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
    <ActivityContainer>
      <StyledHeader variant="h4"> Escolha de atividades</StyledHeader>
      <div>
        {subscriptionDone === false ? (
          <NoSubscriptionDone />
        ) : onlineChoose === true ? (
          <OnlineChoose />
        ) : paymentDone === false ? (
          <NoPaymentDone />
        ) : (
          <Activity />
        )}
      </div>
    </ActivityContainer>
  );
}

const ActivityContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  div {
    font-size: 34px;
    line-height: 40px;
    height: 100%;
    display: flex;
  }
`;
const StyledHeader = styled(Typography)`
  margin-bottom: 36px !important;
`;
