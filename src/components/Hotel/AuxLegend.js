import styled from "styled-components";

export default function AuxLegend({ children }) {
  return(
    <Container>
      {children}
    </Container>
  );
}

const Container = styled.p`
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 23px;
    color: #8E8E8E;
    margin: 14px 0;
`;
