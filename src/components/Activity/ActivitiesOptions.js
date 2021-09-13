import { useEffect, useState, useContext } from "react";
import styled from "styled-components";

import Cards from "./Cards";

export default function ActivitiesOptions() {
  return (
    <>
      <Container>
        <Cards />
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

  /* > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 288px;
    border: 1px solid #d7d7d7;

    :first-child {
      border-right: none;
    }

    :last-child {
      border-left: none;
    }
  } */
`;
