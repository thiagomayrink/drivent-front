import { useEffect, useState } from "react";
import Card from "./Card";
import HotelsLayout from "../../layouts/Hotels";
import styled from "styled-components";
import AuxLegend from "./AuxLegend";
import Room from "./Room";
import useApi from "../../hooks/useApi";
import { toast } from "react-toastify";

export default function Hotel() {
  const [hotels, setHotels] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [hotelId, setHotelId] = useState(0);
  const [roomId, setRoomId] = useState(0);

  const api = useApi();

  useEffect(() => {
    updateHotels();
  }, []);

  useEffect(() => {
    updateRooms();
  }, [hotelId]);

  function updateRooms() {
    api.hotel.getHotelRooms(hotelId).then(rooms => setRooms(rooms));
  }

  function updateHotels() {
    api.hotel.getHotels().then(hotels => setHotels(hotels));
  }

  function reserveRoom() {
    api.hotel
      .reserveRoom(roomId)
      .then(() => {
        toast("Reservado com sucesso!");
        updateRooms();
      })
      .catch(() => toast("Falha ao reservar!"));
  }
  return (
    <HotelsLayout>
      <h2>Escolha de hotel e quarto</h2>
      <AuxLegend>Primeiro, escolha seu hotel</AuxLegend>
      <Cards>
        {hotels.map(hotel => (
          <Card
            key={hotel.id}
            data={hotel}
            hotelId={hotelId}
            setHotelId={setHotelId}
          />
        ))}
      </Cards>
      {hotelId !== 0 ? (
        <>
          <AuxLegend>Ótima pedida! Agora escolha seu quarto:</AuxLegend>
          <Rooms>
            {" "}
            {rooms.map(room => (
              <Room
                key={room.id}
                room={room}
                roomId={roomId}
                setRoomId={setRoomId}
              />
            ))}
          </Rooms>
          {roomId !== 0 ? (
            <Button onClick={() => reserveRoom()}> RESERVAR QUARTO </Button>
          ) : (
            ""
          )}
        </>
      ) : (
        ""
      )}
    </HotelsLayout>
  );
}

const Cards = styled.div`
  display: flex;
  align-items: center;
`;

const Rooms = styled.div`
  display: flex;
`;

const Button = styled.button`
  width: 182px;
  height: 37px;
  background: #e0e0e0;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  border: none;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  text-align: center;

  color: #000000;
  cursor: pointer;
  margin-top: 46px;

  :hover {
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.5);
  }
`;
