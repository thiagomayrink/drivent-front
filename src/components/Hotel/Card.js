import styled from "styled-components";

export default function Card({ hotelId, setHotelId, data }) {
  const { id, image, name, size, vacancies } = data;

  function getHotelRoomsTypeText() {
    let text;
    switch (size) {
      case 1:
        text = "Single";
        break;
      case 2:
        text = "Single e Double";
        break;
      case 3:
        text = "Single, Double e Triple";
        break;
      default:
        text = "";
        break;
    }
    return text;
  }

  return (
    <ContainerCard selected={hotelId === id} onClick={() => setHotelId(id)}>
      <img alt="hotel" src={image} />
      <h3>{name}</h3>
      <div>
        <strong>Tipos de acomodação:</strong>
        <p>{getHotelRoomsTypeText()}</p>
      </div>
      <div>
        <strong>Vagas disponíveis:</strong>
        <p>{vacancies}</p>
      </div>
    </ContainerCard>
  );
}

const ContainerCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 196px;
  height: 264px;
  background: ${(props) => (props.selected ? "#FFEED2" : "#F1F1F1")};
  border-radius: 10px;
  padding: 16px 14px;
  cursor: pointer;
  margin-right: 20px;

  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  color: #3c3c3c;

  img {
    width: 168px;
    height: 109px;
    border-radius: 5px;
  }

  h3 {
    font-size: 20px;
    line-height: 23px;
    color: #343434;
  }

  strong {
    font-weight: bold;
  }
`;
