import { useEffect, useState, useContext } from "react";
import styled from "styled-components";

export default function Room() {
  return (
    <>
      <Container>
        <span>
          <h1>Auditório principal</h1>
        </span>
        <span>
          <h1>Auditório principal</h1>
        </span>
        <span>
          <h1>Auditório principal</h1>
        </span>
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 46px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #d7d7d7;

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
