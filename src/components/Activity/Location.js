import styled from "styled-components";

export default function Location({ locations }) {
  return (
    <Container>
      {locations.map((location) => {
        return (
          <span key={location.id}>
            <h1>{location.name}</h1>
          </span>
        );
      })}
    </Container>
  );
}

const Container = styled.div`
  height: 46px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    height: 100%;
    width: 288px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  h1 {
    line-height: 20px;
    font-weight: 400;
    color: #7b7b7b;
  }
`;
