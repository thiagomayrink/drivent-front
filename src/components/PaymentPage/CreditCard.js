import React from "react";
import Card from "react-credit-cards";

import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  formatFormData,
} from "./utils";

import "react-credit-cards/es/styles-compiled.css";

import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { useState, useEffect } from "react";
import styled from "styled-components";
import DateFnsUtils from "@date-io/date-fns";
import Typography from "@material-ui/core/Typography";
import { toast } from "react-toastify";
import useApi from "../../hooks/useApi";

import Input from "../Form/Input";
import Button from "../Form/Button";
import { FormWrapper } from "./FormWrapper";
import { InputWrapper } from "./InputWrapper";

export default function CreditCard() {
  const [cardData, setCardData] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    issuer: "",
    focused: "",
    formData: null,
  });

  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      <Subttitle>Pagamento</Subttitle>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <FormWrapper onSubmit={handleSubmit}>
          <Card
            number={number}
            name={name}
            expiry={expiry}
            cvc={cvc}
            focused={focused}
            callback={handleCallback}
          />
          <form onSubmit={handleSubmit}>
            <InputWrapper>
              <Input
                type="tel"
                name="number"
                placeholder="Número do Cartão"
                pattern="[\d| ]{16,22}"
                required
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
            </InputWrapper>
            <InputWrapper>
              <Input
                type="text"
                name="name"
                placeholder="Nome"
                required
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
            </InputWrapper>
            <InputWrapper>
              <Input
                type="tel"
                name="expiry"
                placeholder="Válido até"
                pattern="\d\d/\d\d"
                required
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
            </InputWrapper>
            <InputWrapper>
              <Input
                type="tel"
                name="cvc"
                placeholder="CVC"
                pattern="\d{3,4}"
                required
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
            </InputWrapper>
            <input type="hidden" name="issuer" value={issuer} />
          </form>
        </FormWrapper>
        <SubmitContainer>
          <PaymentButton type="submit">FINALIZAR PAGAMENTO</PaymentButton>
        </SubmitContainer>
      </MuiPickersUtilsProvider>
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;

const PaymentButton = styled(Button)`
  margin-top: 20px;
  height: 38px;
`;

const Subttitle = styled.div`
  font-family: Roboto;
  color: #c4c4c4;
  font-size: 20px;
  font-weight: 400;
  line-height: 23px;
  letter-spacing: 0em;
  margin-bottom: 24px;
`;

const SubmitContainer = styled.div`
  margin-top: 40px !important;
  width: 100% !important;

  > button {
    margin-top: 0 !important;
  }
`;
