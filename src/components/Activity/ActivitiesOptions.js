import { useEffect, useState, useContext } from "react";
import styled from "styled-components";

import Cards from "./Cards";

export default function ActivitiesOptions({ activities, locations }) {
  const { id, name, startDate, endDate, vacancy, locationId } = activities;
  return (
    <>
      <Container>
        <Cards
          activities={activities}  
          locations={locations}
        />
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
`;
