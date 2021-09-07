import styled from "styled-components";

export default function OptionsButton(props) {
  const {
    id,
    modality,
    setModality,
    accommodation,
    setAccommodation,
    children,
  } = props;

  function selectOption() {
    if (id === "online") {
      if (modality !== "online") {
        setModality("online");
      } else {
        setModality(false);
      }
      setAccommodation(false);
    }

    if (id === "presential") {
      if (modality !== "presential") {
        setModality("presential");
      } else {
        setModality(false);
        setAccommodation(false);
      }
    }

    if (id === "withoutHotel") {
      if (accommodation !== "withoutHotel") {
        setAccommodation("withoutHotel");
      } else {
        setAccommodation(false);
      }
    }

    if (id === "withHotel") {
      if (accommodation !== "withHotel") {
        setAccommodation("withHotel");
      } else {
        setAccommodation(false);
      }
    }
  }

  return (
    <Button
      onClick={() => selectOption()}
      selected={id === modality || id === accommodation}
    >
      {children}
    </Button>
  );
}

const Button = styled.button`
  width: 145px;
  height: 145px;
  border: 1px solid ${props => (props.selected ? "#FFEED2" : "#cecece")};
  cursor: pointer;
  background-color: ${props => (props.selected ? "#FFEED2" : "#fff")};
  border-radius: 20px;
  margin-right: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  &:hover {
    filter: brightness(0.9);
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
