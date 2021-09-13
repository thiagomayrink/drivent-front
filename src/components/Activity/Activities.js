import { useEffect, useState, useContext } from "react";
import styled from "styled-components";

export default function Activities() {
  return (
    <>
      <Container>
        <div></div>
        <div></div>
        <div></div>
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  div {
    height: 100%;
    width: 288px;
    border-right: 1px solid #d7d7d7;

    :first-child {
      border-left: 1px solid #d7d7d7;
    }
  }
`;
