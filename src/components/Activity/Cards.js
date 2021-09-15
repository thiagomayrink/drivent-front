import { useEffect, useState, useContext } from "react";
import styled from "styled-components";

import Card from "./Card";

export default function Cards({ activities, locations, dayId }) {
  const [activityId, setActivityId] = useState(false);
  const [selectedActivities, setSelectedActivities] = useState([]);

  return (
    <>
      {locations.map((location) => (
        <Container key={location.id}>
          {activities
            .filter(
              (activity) =>
                location.id === activity.locationId &&
                activity.eventDayId === dayId
            )
            .map((card) => (
              <Card
                key={card.id}
                activity={card}
                id={card.id}
                name={card.name}
                startDate={card.startDate}
                endDate={card.endDate}
                vacancy={card.vacancy}
                activityId={activityId}
                setActivityId={setActivityId}
                eventDay={card.eventDayId}
                dayId={dayId}
                locationId={location.id}
                activityLocationId={card.locationId}
                selectedActivities={selectedActivities}
                setSelectedActivities={setSelectedActivities}
              />
            ))}
        </Container>
      ))}
    </>
  );
}

const Container = styled.div`
  height: 100%;
  width: 288px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 10px;
  border: 1px solid #d7d7d7;

  :first-child {
    border-right: none;
  }

  :last-child {
    border-left: none;
  }
`;
