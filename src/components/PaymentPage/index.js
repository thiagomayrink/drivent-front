import React, { useContext } from "react";
import Card from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";

import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
} from "./utils";
import { FaCheckCircle } from "react-icons/fa";

import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { useState } from "react";
import styled from "styled-components";
import DateFnsUtils from "@date-io/date-fns";
import { toast } from "react-toastify";
import useApi from "../../hooks/useApi";

import Input from "../Form/Input";
import Button from "../Form/Button";
import { FormWrapper } from "./FormWrapper";
import { InputWrapper } from "./InputWrapper";
import { useForm } from "../../hooks/useForm";
import { ErrorMsg } from "./ErrorMsg";
import FormValidations from "./FormValidations";
import UserContext from "../../contexts/UserContext";
import { Typography } from "@material-ui/core";
import { useHistory } from "react-router";

export default function PaymentPage(props) {
  //prettier-ignore
  const { userId, totalPrice, accomodationName, modalityName, paymentDone } = props;

  const [dynamicInputIsLoading, setDynamicInputIsLoading] = useState(false);
  const { userData, setUserData } = useContext(UserContext);

  const { payment } = useApi();
  const history = useHistory();

  const {
    handleSubmit,
    handleChange,
    data,
    errors,
    setData,
    customHandleChange,
  } = useForm({
    validations: FormValidations,

    onSubmit: (data) => {
      setDynamicInputIsLoading(true);
      const newData = {
        name: data.name,
        number: data.number,
        expiry: data.expiry,
        cvc: data.cvc,
      };
      if (newData.name && newData.number && newData.expiry && newData.cvc) {
        const purchaseData = {
          accommodationId: userData.accommodationId,
          modalityId: userData.modalityId,
          userId: userId,
          paymentDone: true,
        };

        payment
          .process(purchaseData)
          .then(() => {
            setUserData({ ...userData, paymentDone: true });
            toast("Ingresso reservado com sucesso!");
            setTimeout(() => history.go(0), 1000);
          })
          .catch((error) => {
            if (error.response?.data?.details) {
              for (const detail of error.response.data.details) {
                toast(detail);
              }
            } else {
              toast("Não foi possível realizar o pagamento!");
            }
          });
      }
    },

    initialValues: {
      number: "",
      name: "",
      expiry: "",
      cvc: "",
      issuer: "",
      focused: "",
      formData: null,
    },
  });

  function handleCallback({ issuer }, _isValid) {
    if (issuer !== "unknown") {
      setData({ ...data, issuer: issuer });
    }
  }

  function handleInputFocus(e) {
    setData({ ...data, focused: e.target.name });
  }

  if (!paymentDone && modalityName && accomodationName) {
    return (
      <>
        <StyledHeader variant="h4">Ingresso e pagamento</StyledHeader>
        <Subttitle>Ingresso escolhido</Subttitle>
        <OrderSummary>
          <span>
            {modalityName === "presential" ? "Presencial" : "Online"} +{" "}
            {accomodationName === "withHotel" ? "Com Hotel" : "Sem Hotel"}
          </span>
          <p>R$ {totalPrice / 100}</p>
        </OrderSummary>
        <Subttitle>Pagamento</Subttitle>
        <Container>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <FormWrapper onSubmit={handleSubmit}>
              <CardContainer>
                <Card
                  cvc={data.cvc}
                  expiry={data.expiry}
                  focused={data.focused}
                  name={data.name}
                  number={data.number}
                  callback={handleCallback}
                />

                <div>
                  <StyledInputWraper>
                    <Input
                      type="tel"
                      name="number"
                      placeholder="Número do Cartão"
                      pattern="[\d| ]{16,22}"
                      value={data.number}
                      required
                      onFocus={handleInputFocus}
                      onChange={(e) =>
                        customHandleChange(
                          "number",
                          formatCreditCardNumber
                        )(e.target.value)
                      }
                    />
                    {errors.number && <ErrorMsg>{errors.number}</ErrorMsg>}
                    <p>E.g.: 49..., 51..., 36..., 37...</p>
                  </StyledInputWraper>
                  <StyledInputWraper>
                    <Input
                      type="text"
                      name="name"
                      placeholder="Nome"
                      value={data.name}
                      required
                      onFocus={handleInputFocus}
                      onChange={handleChange("name")}
                    />
                    {errors.name && <ErrorMsg>{errors.name}</ErrorMsg>}
                  </StyledInputWraper>
                  <InputContainer>
                    <StyledInputWraper>
                      <Input
                        type="tel"
                        name="expiry"
                        placeholder="Válido até"
                        pattern="\d\d/\d\d"
                        value={data.expiry}
                        required
                        onFocus={handleInputFocus}
                        onChange={(e) =>
                          customHandleChange(
                            "expiry",
                            formatExpirationDate
                          )(e.target.value)
                        }
                      />
                      {errors.expiry && <ErrorMsg>{errors.expiry}</ErrorMsg>}
                    </StyledInputWraper>
                    <StyledInputWraper>
                      <Input
                        type="tel"
                        name="cvc"
                        placeholder="CVC"
                        pattern="\d{3,4}"
                        value={data.cvc}
                        required
                        onFocus={handleInputFocus}
                        onChange={(e) =>
                          customHandleChange("cvc", formatCVC)(e.target.value)
                        }
                      />
                      {errors.cvc && <ErrorMsg>{errors.cvc}</ErrorMsg>}
                    </StyledInputWraper>
                  </InputContainer>
                  <input type="hidden" name="issuer" value={data.issuer} />
                </div>
              </CardContainer>
              <SubmitContainer>
                <PaymentButton disabled={dynamicInputIsLoading} type="submit">
                  FINALIZAR PAGAMENTO
                </PaymentButton>
              </SubmitContainer>
            </FormWrapper>
          </MuiPickersUtilsProvider>
        </Container>
      </>
    );
  } else if (paymentDone) {
    return (
      <>
        <Subttitle>Pagamento</Subttitle>
        <CheckoutContainer>
          <CheckoutIcon />
          <ConfirmationMessage>
            <p>
              <strong>Pagamento confirmado!</strong>
            </p>
            <p>Prossiga para escolha de hospedagem e atividades</p>
          </ConfirmationMessage>
        </CheckoutContainer>
      </>
    );
  }
}

const StyledHeader = styled(Typography)`
  margin-bottom: 36px !important;
`;

const OrderSummary = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 290px;
  height: 108px;
  background: #ffeed2;
  border-radius: 20px;

  font-family: Roboto, sans-serif;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 0em;
  color: #454545;

  p {
    margin-top: 8px;
    font-size: 14px;
    line-height: 16px;
    color: #898989;
  }
`;
const Container = styled.div`
  @media (max-width: 600px) {
    form {
      margin-top: 16px;
    }
  }
`;

const SubmitContainer = styled.div`
  margin-top: 40px !important;
  width: 100% !important;

  > button {
    margin-top: 0 !important;
  }

  @media (max-width: 600px) {
    margin-top: 24px !important;
    text-align: center;
  }
`;

const PaymentButton = styled(Button)`
  margin-top: 20px;
  height: 38px;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 600px) {
    flex-direction: column;
    width: 300px;
  }
`;

const StyledInputWraper = styled(InputWrapper)`
  > p {
    margin: 8px 0 4px 0;
    font-weight: normal;
    color: #8e8e8e;
  }

  @media (max-width: 600px) {
    margin: 0;
  }
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  > div {
    width: calc(50% - 8px);
  }
`;

const Subttitle = styled.div`
  color: #8e8e8e;
  margin: 30px 0 20px 0;
  width: 100%;
  text-align: left;
  font-size: 1.25rem;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  line-height: 1.6;
  letter-spacing: 0.0075em;
  span {
    font-weight: bold;
  }

  @media (max-width: 600px) {
    width: 300px;
  }
`;

const CheckoutContainer = styled.div`
  display: flex;
  align-items: center;
  font-family: Roboto, sans-serif;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 0em;
  color: #454545;
`;

const ConfirmationMessage = styled.div`
  margin-left: 12px;
`;

const CheckoutIcon = styled(FaCheckCircle)`
  font-size: 44px;
  color: #36b853;
`;
