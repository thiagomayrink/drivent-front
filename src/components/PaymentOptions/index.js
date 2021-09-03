import { useState, useEffect } from "react";
import styled from "styled-components";
import DateFnsUtils from "@date-io/date-fns";
import Typography from "@material-ui/core/Typography";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

import useApi from "../../hooks/useApi";
import ModalityButton from "./ModalityButton";
import AccommodationButton from "./AccommodationButton";
import BookingButton from "./BookingButton";

export default function PaymentOptions() {
  const [subscriptionDone, setSubscriptionDone] = useState(false);
  const [modality, setModality] = useState(false);
  const [accommodation, setAccommodation] = useState(false);
  const { payment } = useApi();

  useEffect(() => {
    payment.getPaymentInformations().then(response => {
      // eslint-disable-next-line no-console
      console.log(response);
      setSubscriptionDone(true);
    });
    payment.getPaymentInformations().catch(err => {
      // eslint-disable-next-line no-console
      console.log(err.response.data);
      setSubscriptionDone(true);
    });
  }, []);

  return (
    <>
      <StyledHeader variant="h4">Ingresso e pagamento</StyledHeader>
      <StyledSubtitle variant="h6" show={subscriptionDone}>
        Primeiro, escolha sua modalidade de ingresso
      </StyledSubtitle>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <NoSubscriptionContainer show={subscriptionDone}>
          <StyledSubtitle
            variant="h6"
            show={!subscriptionDone}
            className="center"
          >
            Você precisa completar sua inscrição antes de prosseguir pra escolha
            de ingresso
          </StyledSubtitle>
        </NoSubscriptionContainer>
        <ModalityContainer show={subscriptionDone}>
          <ModalityButton
            id={"presential"}
            modality={modality}
            setModality={setModality}
            setAccommodation={setAccommodation}
          >
            <span>Presencial</span>
            <span>R$ 250</span>
          </ModalityButton>
          <ModalityButton
            id={"online"}
            modality={modality}
            setModality={setModality}
            setAccommodation={setAccommodation}
          >
            <span>Online</span>
            <span>R$ 100</span>
          </ModalityButton>
        </ModalityContainer>
        <AccommodationContainer show={!!modality}>
          <WithAccommodation>
            <StyledSubtitle variant="h6" show={modality === "presential"}>
              Ótimo! Agora escolha sua modalidade de hospedagem
            </StyledSubtitle>
            <HotelOption>
              <AccommodationButton
                id={"withoutHotel"}
                show={modality === "presential"}
                accommodation={accommodation}
                setAccommodation={setAccommodation}
              >
                <span>Sem Hotel</span>
                <span>+ R$ 0</span>
              </AccommodationButton>
              <AccommodationButton
                id={"withHotel"}
                show={modality === "presential"}
                accommodation={accommodation}
                setAccommodation={setAccommodation}
              >
                <span>Com Hotel</span>
                <span>+ R$ 350</span>
              </AccommodationButton>
            </HotelOption>
            <SubmitContainer show={!!accommodation}>
              <StyledSubtitle show={!!accommodation} variant="h6">
                <p>
                  Fechado! O total ficou em
                  <span>
                    {accommodation === "withHotel" ? " R$ 600" : " R$ 250"}
                  </span>
                  . Agora é só confirmar:
                </p>
              </StyledSubtitle>
              <BookingButton
                id={"presential"}
                modality={modality}
                accommodation={accommodation}
              >
                RESERVAR INGRESSO
              </BookingButton>
            </SubmitContainer>
          </WithAccommodation>
          <WithoutAccommodation>
            <StyledSubtitle variant="h6" show={modality === "online"}>
              <p>
                Fechado! O total ficou em<span> R$ 100</span>. Agora é só
                confirmar:
              </p>
            </StyledSubtitle>
            <BookingButton
              id={"online"}
              modality={modality}
              accommodation={accommodation}
            >
              RESERVAR INGRESSO
            </BookingButton>
          </WithoutAccommodation>
        </AccommodationContainer>
      </MuiPickersUtilsProvider>
    </>
  );
}

const StyledHeader = styled(Typography)`
  margin-bottom: 36px !important;
`;
const StyledSubtitle = styled(Typography)`
  color: #8e8e8e;
  width: 100%;
  display: ${props => (props.show ? "flex" : "none")};
  text-align: left;

  span {
    font-weight: bold;
  }

  @media (max-width: 600px) {
    width: 300px;
  }
`;
const ModalityContainer = styled.div`
  margin-top: 18px;
  display: ${props => (props.show ? "flex" : "none")};
`;
const NoSubscriptionContainer = styled.div`
  display: ${props => (props.show ? "none" : "flex")};
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 500px;

  .center {
    text-align: center;
  }

  @media (max-width: 600px) {
    height: 280px;
  }
`;

const AccommodationContainer = styled.div`
  display: ${props => (props.show ? "flex" : "none")};
  height: 100px;
  width: 100%;
`;

const WithAccommodation = styled.div`
  margin-top: 44px;
`;

const WithoutAccommodation = styled.div`
  margin-top: 44px;
`;

const HotelOption = styled.div`
  display: flex;
  margin-top: 18px;
`;
const SubmitContainer = styled.div`
  margin-top: 44px;
  padding-bottom: 50px;
`;
