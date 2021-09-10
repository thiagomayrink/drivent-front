import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import HotelsLayout from "../../layouts/Hotels";

export default function NoPaymentDone() {
  return (
    <HotelsLayout>
      <StyledSubtitle variant="h6" className="center">
        Você precisa ter confirmado pagamento antes de fazer a escolha de
        atividades.
      </StyledSubtitle>
    </HotelsLayout>
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
