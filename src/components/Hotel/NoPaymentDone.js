import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import HotelsLayout from "../../layouts/Hotels";

export default function NoPaymentDone() {
  return (
    <HotelsLayout>
      <Container>
        <StyledSubtitle variant="h6" className="center">
        Você precisa ter confirmado pagamento antes de fazer a escolha de
        hospedagem.
        </StyledSubtitle>
      </Container>
    </HotelsLayout>
  );
}

const StyledSubtitle = styled(Typography)`
  color: #8e8e8e;
  width: 100%;
  text-align: center;

  span {
    font-weight: bold;
  }

  @media (max-width: 600px) {
    width: 300px;
  }
`;

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;
