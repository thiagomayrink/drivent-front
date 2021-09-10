import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import PaymentLayout from "../../layouts/Payment";

export default function NoSubscriptionDone() {
  return (
    <PaymentLayout>
      <StyledSubtitle variant="h6" className="center">
        Você precisa completar sua inscrição antes de prosseguir pra escolha de
        ingresso.
      </StyledSubtitle>
    </PaymentLayout>
  );
}

const StyledSubtitle = styled(Typography)`
  color: #8e8e8e;
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    font-weight: bold;
  }

  @media (max-width: 600px) {
    width: 300px;
  }
`;
