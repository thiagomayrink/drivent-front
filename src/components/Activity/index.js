import { useEffect, useState, useContext } from "react";
import Location from "./Location";
import ActivitiesOptions from "./ActivitiesOptions";
import styled from "styled-components";
import useApi from "../../hooks/useApi";

export default function Activity() {
  const [chosenDay, setChosenDay] = useState(false);
  const [activities, setActivities] = useState([]);
  const [locations, setLocations] = useState([]);

  const api = useApi();

  useEffect(() => {
    getActivities();
    getLocations();
  }, []);

  function getActivities() {
    api.activity
      .getActivities()
      .then((activities) => setActivities(activities));
  }

  function getLocations() {
    api.activity.getLocations().then((locations) => setLocations(activities));
  }

  return (
    <>
      <Days>
        {!chosenDay && <h2>Primeiro, escolha o dia</h2>}
        <span>
          {activities.map((activity) => {
            return (
              <ActivitiesDay>
                <p onClick={() => setChosenDay(true)}>{activity.eventDay}</p>
              </ActivitiesDay>
            );
          })}
        </span>
      </Days>
      {chosenDay && (
        <Locations>
          <Location locations={locations} />
          <ActivitiesOptions activities={activities} locations={locations} />
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

const ActivitiesDay = styled.div`
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  width: 131px;
  height: 37px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e0e0e0;
  border: none;
  border-radius: 4px;
  margin-right: 24px;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: #454545;
  cursor: pointer;
`;
