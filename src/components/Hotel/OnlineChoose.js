import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import HotelsLayout from "../../layouts/Hotels";

export default function NoSubscriptionDone() {
  return (
    <HotelsLayout>
      <Container>
        <StyledSubtitle variant="h6" className="center">
        Sua modalidade de ingresso não inclui hospedagem. Prossiga para a
        escolha de atividades.
        </StyledSubtitle>
      </Container>

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

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;
