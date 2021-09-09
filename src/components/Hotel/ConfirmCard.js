import CardLayout from "../../layouts/Card";

export default function ConfirmCard({ data }) {
  const { id, image, name, size } = data.hotel;

  function getRoomAvailableText() {
    let text;
    switch(data.size) {
    case 1:
      text = "Você";
      break;
    case 2:
      text = data.available===1 ? "Você" : "Você e mais 1";
      break;
    case 3:
      if(data.available === 0) text = "Você e mais 2";
      if(data.available === 1) text = "Você e mais 1";
      if(data.available === 2) text = "Você";
      break;
    default: 
      text = "";
      break;
    }
    return text;
  }

  function getHotelRoomTypeText() {
    let text;
    switch(data.size) {
    case 1:
      text = `${data.name} (Single)`;
      break;
    case 2:
      text = `${data.name} (Double)`;
      break;
    case 3:
      text = `${data.name} (Triple)`;
      break;
    default: 
      text = "";
      break;
    }
    return text;
  }
  
  return(
    <CardLayout selected>
      <img alt="hotel" src={image}/>
      <h3>{name}</h3>
      <div>
        <strong>Quarto reservado:</strong>
        <p>{getHotelRoomTypeText()}</p>
      </div>
      <div>
        <strong>Pessoas no seu quarto:</strong>
        <p>{getRoomAvailableText()}</p>
      </div>
    </CardLayout>
  );
}
