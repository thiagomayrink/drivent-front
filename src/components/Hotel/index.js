import { useEffect, useState, useContext } from "react";
import Card from "./Card";
import ConfirmCard from "./ConfirmCard";
import styled from "styled-components";
import AuxLegend from "./AuxLegend";
import Room from "./Room";
import useApi from "../../hooks/useApi";
import { toast } from "react-toastify";
import UserContext from "../../contexts/UserContext";

export default function Hotel() {
  const { userData } = useContext(UserContext);
  const [reservedInfos, setReservedInfos] = useState("");
  const [changingRoom, setChangingRoom] = useState(false);
  const [hotels, setHotels] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [hotelId, setHotelId] = useState(0);
  const [roomId, setRoomId] = useState(0);

  const api = useApi();

  useEffect(() => {
    checkUserInfos();
    updateHotels();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateHotels();
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    updateRooms();
  }, [hotelId]);

  function updateHotels() {
    api.hotel.getHotels().then(hotels => setHotels(hotels));
  }

  function checkUserInfos() {
    api.hotel.userRoomInfos(userData.user.id).then(infos => {
      setReservedInfos(infos);
    });
  }

  function updateRooms() {
    api.hotel.getHotelRooms(hotelId).then(rooms => setRooms(rooms));
  }

  function reserveRoom() {
    if (changingRoom) {
      api.hotel
        .changeRoom(roomId)
        .then(() => {
          toast("Troca efetuada com sucesso!");
          setTimeout(() => {
            setChangingRoom(false);
            checkUserInfos();
          }, 200);
        })
        .catch(() => {
          toast("Falha ao trocar de quarto!");
        });
    } else {
      api.hotel
        .reserveRoom(roomId)
        .then(() => {
          toast("Reservado com sucesso!");
          setTimeout(() => {
            checkUserInfos();
          }, 200);
        })
        .catch(e => {
          if (e.response.status === 409)
            return toast("Já possuí um quarto reservado!");
          toast("Falha ao reservar!");
        });
    }
  }

  function changeRoom() {
    setReservedInfos("");
    setChangingRoom(true);
    updateHotels();
  }

  return (
    <HotelLayout>
      {reservedInfos ? (
        <>
          <AuxLegend>Você já escolheu seu quarto:</AuxLegend>
          <ConfirmCard key={1} data={reservedInfos} />
          <Button onClick={() => changeRoom()}> TROCAR DE QUARTO </Button>
        </>
      ) : (
        <>
          {" "}
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
                <Button onClick={() => reserveRoom()}>
                  {" "}
                  {changingRoom ? "TROCAR DE QUARTO" : "RESERVAR QUARTO"}{" "}
                </Button>
              ) : (
                ""
              )}
            </>
          ) : (
            ""
          )}
        </>
      )}
    </HotelLayout>
  );
}

const Cards = styled.div`
  display: flex;
  align-items: center;
  overflow-x: auto;
`;

const Rooms = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: max-content;
`;

const Button = styled.button`
  width: 182px;
  min-height: 37px;
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
  margin: 36px 0;

  display: flex;
  align-items: center;
  justify-content: center;

  :hover {
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.5);
  }
`;

const HotelLayout = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  padding: 0;

  & > * {
    text-align: initial;
  }

  @media (max-width: 600px) {
    flex-direction: column;
  }

  h2 {
    font-style: normal;
    font-weight: normal;
    font-size: 34px;
    line-height: 40px;
    color: #000000;
  }
`;
