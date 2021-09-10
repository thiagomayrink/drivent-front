import { useState, useEffect } from "react";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";

import PaymentLayout from "../../layouts/PaymentOptions";
import OptionsButton from "./OptionsButton";
import BookingButton from "./BookingButton";

import useApi from "../../hooks/useApi";
import { toast } from "react-toastify";

export default function PaymentOptions(props) {
  const { userId } = props;
  const [subscriptionDone, setSubscriptionDone] = useState(false);
  const [modality, setModality] = useState(false);
  const [accommodation, setAccommodation] = useState(false);
  const { payment } = useApi();

  useEffect(() => {
    payment.getPaymentInformations(userId).then(response => {
      toast(response.data.status);
      setSubscriptionDone(true);
    });
    payment.getPaymentInformations(userId).catch(err => {
      toast(err.response.status);
      setSubscriptionDone(true);
    });
  }, []);

  return (
    <PaymentLayout>
      <StyledHeader variant="h4">Ingresso e pagamento</StyledHeader>
      <WithoutSubscriptionContainer show={subscriptionDone.toString()}>
        <StyledSubtitle variant="h6" className="center">
          Você precisa completar sua inscrição antes de prosseguir pra escolha
          de ingresso
        </StyledSubtitle>
      </WithoutSubscriptionContainer>
      <WithSubscriptionContainer show={subscriptionDone.toString()}>
        <StyledSubtitle variant="h6">
          Primeiro, escolha sua modalidade de ingresso
        </StyledSubtitle>
        <div>
          <OptionsButton
            id={"presential"}
            modality={modality}
            setModality={setModality}
            accommodation={accommodation}
            setAccommodation={setAccommodation}
          >
            <span>Presencial</span>
            <span>R$ 250</span>
          </OptionsButton>
          <OptionsButton
            id={"online"}
            modality={modality}
            setModality={setModality}
            accommodation={accommodation}
            setAccommodation={setAccommodation}
          >
            <span>Online</span>
            <span>R$ 100</span>
          </OptionsButton>
        </div>
        <AccommodationContainer show={(!!modality).toString()}>
          <WithAccommodation show={(modality === "presential").toString()}>
            <StyledSubtitle variant="h6">
              Ótimo! Agora escolha sua modalidade de hospedagem
            </StyledSubtitle>
            <HotelOption>
              <OptionsButton
                id={"withoutHotel"}
                modality={modality}
                setModality={setModality}
                accommodation={accommodation}
                setAccommodation={setAccommodation}
              >
                <span>Sem Hotel</span>
                <span>+ R$ 0</span>
              </OptionsButton>
              <OptionsButton
                id={"withHotel"}
                modality={modality}
                setModality={setModality}
                accommodation={accommodation}
                setAccommodation={setAccommodation}
              >
                <span>Com Hotel</span>
                <span>+ R$ 350</span>
              </OptionsButton>
            </HotelOption>
            <SubmitContainer show={(!!accommodation).toString()}>
              <StyledSubtitle variant="h6">
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
                userId={userId}
              >
                RESERVAR INGRESSO
              </BookingButton>
            </SubmitContainer>
          </WithAccommodation>
          <WithoutAccommodation show={(modality === "online").toString()}>
            <StyledSubtitle variant="h6">
              <p>
                Fechado! O total ficou em<span> R$ 100</span>. Agora é só
                confirmar:
              </p>
            </StyledSubtitle>
            <BookingButton
              id={"online"}
              modality={modality}
              accommodation={accommodation}
              userId={userId}
            >
              RESERVAR INGRESSO
            </BookingButton>
          </WithoutAccommodation>
        </AccommodationContainer>
      </WithSubscriptionContainer>
    </PaymentLayout>
  );
}

const StyledHeader = styled(Typography)`
  margin-bottom: 36px !important;
`;
const StyledSubtitle = styled(Typography)`
  color: #8e8e8e;
  width: 100%;
  text-align: left;

  span {
    font-weight: bold;
  }

  @media (max-width: 600px) {
    width: 300px;
  }
`;
const WithoutSubscriptionContainer = styled.div`
  display: ${props => (props.show === "true" ? "none" : "flex")};
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
const WithSubscriptionContainer = styled.div`
  display: ${props => (props.show === "true" ? "flex" : "none")};
  flex-direction: column;

  > div:first-of-type {
    display: flex;
    margin-top: 18px;
  }
`;
const AccommodationContainer = styled.div`
  display: ${props => (props.show === "true" ? "flex" : "none")};
  flex-direction: column;
  height: 100px;
  width: 100%;
`;
const WithAccommodation = styled.div`
  display: ${props => (props.show === "true" ? "flex" : "none")};
  flex-direction: column;
  margin-top: 44px;
`;
const WithoutAccommodation = styled.div`
  display: ${props => (props.show === "true" ? "flex" : "none")};
  flex-direction: column;
  margin-top: 44px;
`;
const HotelOption = styled.div`
  display: flex;
  margin-top: 18px;
`;
const SubmitContainer = styled.div`
  display: ${props => (props.show === "true" ? "flex" : "none")};
  flex-direction: column;
  margin-top: 44px;
  padding-bottom: 50px;
`;
