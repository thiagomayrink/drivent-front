import styled from "styled-components";

export default function ModalityButton(props) {
  const { id, modality, setModality, setAccommodation, active, children } = props;
  function selectOption() {
    if(id === "online") {
      setAccommodation(false);
    }

    if(modality === id) {
      setModality(false);
	  setAccommodation(false);
    } else {
      setModality(id);
    }
  }

  return (
    <Button 
      active={active} 
      onClick={() => selectOption()}
	  selected={modality === id}
	  >
      	{children}
    </Button>
  );
}

const Button = styled.button`
  width: 145px;
  height: 145px;
  border: 1px solid ${props => props.selected ? "#FFEED2" : "#cecece"};;
  cursor: pointer;
  background-color: ${props => props.selected ? "#FFEED2" : "#fff"};
  border-radius: 20px;
  margin-right: 24px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  &:hover {
    filter: brightness(0.90);
  }

  & > *:first-child {
	font-size: 16px;
	line-height: 19px;
	text-align: center;
	color: #454545;
  }

  & > *:last-child {
    font-size: 14px;
	line-height: 16px;
	text-align: center;
	color: #898989;
  }

  @media (max-width: 600px) {
    width: 100px;
	height: 100px;
  }
`;
