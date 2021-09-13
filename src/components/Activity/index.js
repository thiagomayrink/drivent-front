import { useEffect, useState, useContext } from "react";
import Room from "./Room";
import ActivitiesOptions from "./ActivitiesOptions";
import styled from "styled-components";
import useApi from "../../hooks/useApi";
import { toast } from "react-toastify";
import UserContext from "../../contexts/UserContext";

export default function Activity() {
  const { userData } = useContext(UserContext);
  const [reservedInfos, setReservedInfos] = useState("");
  const [changingRoom, setChangingRoom] = useState(false);
  const [hotels, setHotels] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [hotelId, setHotelId] = useState(0);
  const [roomId, setRoomId] = useState(0);

  const api = useApi();

  return (
    <>
      <Days>
        <h2>Primeiro, escolha o dia</h2>
        <span>
          <ActivitiesDay>
            <p>Sexta, 22/10</p>
          </ActivitiesDay>
          <ActivitiesDay>
            <p>Sexta, 23/10</p>
          </ActivitiesDay>
          <ActivitiesDay>
            <p>Sexta, 24/10</p>
          </ActivitiesDay>
        </span>
      </Days>
      <Rooms>
        <Room />
        <ActivitiesOptions />
      </Rooms>
    </>
  );
}

const Rooms = styled.div`
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
