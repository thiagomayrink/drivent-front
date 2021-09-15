import { useState } from "react";
import styled from "styled-components";

export default function Day({ eventDay, dayId, setDayId, id }) {
  return (
    <ActivitiesDay
      key={id}
      selected={dayId === id}
      onClick={() => setDayId(id)}
    >
      <p>{eventDay}</p>
    </ActivitiesDay>
  );
}

const ActivitiesDay = styled.div`
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  width: 131px;
  height: 37px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => (props.selected ? "#FFD37D" : "#e0e0e0")};
  border: none;
  border-radius: 4px;
  margin-right: 24px;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: #454545;
  cursor: pointer;
`;
