import styled from "styled-components";
import Typography from "@material-ui/core/Typography";

export default function Certificate() {
  return (
    <>
      <StyledHeader variant="h4"> Certificado </StyledHeader>
      <Container>
        <StyledSubtitle variant="h6" className="center">
        Em breve...
        </StyledSubtitle>
      </Container>
    </>
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
    height: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledHeader = styled(Typography)`
  margin-bottom: 36px !important;
`;
