import { useEffect, useState, useContext } from "react";
import Location from "./Location";
import ActivitiesOptions from "./ActivitiesOptions";
import styled from "styled-components";
import useApi from "../../hooks/useApi";

import Day from "./Day";
import ActDB from "./ActDB";
import LocDB from "./LocDB";
import DayDB from "./DayDB";

export default function Activity() {
  const activity = ActDB();
  const location = LocDB();
  const day = DayDB();
  // const [activities, setActivities] = useState([]);
  // const [locations, setLocations] = useState([]);
  const [activities, setActivities] = useState(activity);
  const [activitiesDays, setActivitiesDays] = useState(day);
  const [locations, setLocations] = useState(location);
  const [dayId, setDayId] = useState(0);

  const api = useApi();

  // useEffect(() => {
  //   getActivities();
  //   getLocations();
  // }, []);

  // function getActivitiesDays() {
  //   api.activity
  //     .getActivitiesDays()
  //     .then((days) => setActivitiesDays(days));
  // }

  // function getActivities() {
  //   api.activity
  //     .getActivities()
  //     .then((activities) => setActivities(activities));
  // }

  // function getLocations() {
  //   api.activity.getLocations().then((locations) => setLocations(activities));
  // }

  return (
    <>
      <Days>
        {dayId === 0 && <h2>Primeiro, escolha o dia</h2>}
        <span>
          {activitiesDays.map((day) => (
            <Day
              eventDay={day.eventDay}
              setDayId={setDayId}
              id={day.id}
              dayId={dayId}
            />
          ))}
        </span>
      </Days>
      {dayId !== 0 && (
        <Locations>
          <Location locations={locations} />
          <ActivitiesOptions
            activities={activities}
            locations={locations}
            dayId={dayId}
          />
        </Locations>
      )}
    </>
  );
}

const Locations = styled.div`
  height: 422px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Days = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-bottom: 43px;

  h2 {
    font-size: 20px;
    font-weight: 400;
    line-height: 23px;
    color: #8e8e8e;
  }

  span {
    margin-top: 25px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
`;
