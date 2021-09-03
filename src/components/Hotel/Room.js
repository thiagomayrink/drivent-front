import styled from "styled-components";
import PersonIcon  from "@material-ui/icons/Person";
import PersonOutlineOutlinedIcon  from "@material-ui/icons/PersonOutlineOutlined";

export default function Room({ room, roomId, setRoomId }) {
  const { id, name, size,  available } = room;

  const availablePerson = Array(available).fill(1);
  const occupiedPerson = Array(size - available).fill(1);

  const availableRoom = available > 0;

  return(
    <Container blocked={!availableRoom} selected={roomId === id} onClick={() => availableRoom && setRoomId(id)}>
      <strong>{name}</strong>
      <div>
        {availablePerson.map( () => <PersonOutlineOutlinedIcon className="availableIcon"/>)}
        {occupiedPerson.map( () => <PersonIcon />)}
      </div>
    </Container>
  );
}

const Container = styled.div`
    width: 190px;
    height: 45px;
    border: 1px solid #CECECE;
    border-radius: 10px;
    margin: 0 17px 8px 0;
    padding: 11px 16px;
    cursor: pointer;

    .availableIcon:first-of-type{
        color: ${props => props.selected ? "#FF4791" : "#000000"};
    }

    display: flex;
    align-items: center;
    justify-content: space-between;

    strong{
        font-weight: bold;
        font-size: 20px;
        line-height: 23px;
        text-align: center;
        color: #454545;
    }

    background: ${props => {
    if(props.blocked) return "#E9E9E9";
    if(props.selected) return "#FFEED2";
    return "#transparent";
  }};
    opacity: ${props => props.blocked ? "0.7" : "1"};
`;
