import CardLayout from "../../layouts/Card";

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
  
  return(
    <CardLayout selected={hotelId === id} onClick={() => setHotelId(id)}>
      <img alt="hotel" src={image}/>
      <h3>{name}</h3>
      <div>
        <strong>Tipos de acomodação:</strong>
        <p>{getHotelRoomsTypeText()}</p>
      </div>
      <div>
        <strong>Vagas disponíveis:</strong>
        <p>{vacancies}</p>
      </div>
    </CardLayout>
  );
}
