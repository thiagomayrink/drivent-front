import { toast } from "react-toastify";
import styled from "styled-components";
import useApi from "../../hooks/useApi";
import { useHistory } from "react-router-dom";

export default function BookingButton(props) {
  const { id, modality, accommodation, children } = props;
  const { ticket } = useApi();
  let history = useHistory();

  function bookTicket() {
    const newData = {
      modality: modality,
      accommodation: accommodation,
    };

    ticket
      .save(newData)
      .then(() => {
        toast("Ingresso reservado com sucesso!");
        history.push("/dashboard");
      })
      .catch(err => {
        toast(err.response.data.message);
      });
  }

  return (
    <Button
      id={id}
      show={
        (id === modality && !!accommodation) ||
        (modality === "online" && id !== "presential")
      }
      onClick={() => bookTicket()}
    >
      {children}
    </Button>
  );
}

const Button = styled.button`
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  width: 162px;
  height: 37px;
  cursor: pointer;
  background: #e0e0e0;
  border: 0;
  border-radius: 4px;
  margin-right: 24px;
  margin-top: 20px;

  display: ${props => (props.show ? "flex" : "none")};
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
`;
