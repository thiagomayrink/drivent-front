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
import { useForm } from "../../hooks/useForm";
import { ErrorMsg } from "./ErrorMsg";
import { validations as FormValidations } from "./FormValidations";

export default function CreditCard() {
  const [dynamicInputIsLoading, setDynamicInputIsLoading] = useState(false);
  const [hasTicket, setHasTicket] = useState("false"); //rollback to false before commit;
  const { payment } = useApi();

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

      payment
        .save(newData)
        .then(() => {
          toast("Pagamento realizado com sucesso!");
          setDynamicInputIsLoading(false);
        })
        .catch((error) => {
          if (error.response?.data?.details) {
            for (const detail of error.response.data.details) {
              toast(detail);
            }
          } else {
            toast("Não foi possível realizar o pagamento");
          }
          /* eslint-disable-next-line no-console */
          console.log(error);
        });
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

  useEffect(() => {
    payment.getPaymentInformations().then((response) => {
      if (response.status !== 200) {
        return setHasTicket("true");
      }
      setData({
        number: "",
        name: "",
        expiry: "",
        cvc: "",
        issuer: "",
        focused: "",
        formData: null,
      });
    });
  }, []);

  const [cardData, setCardData] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    issuer: "",
    focused: "",
    formData: null,
  });

  function handleInputFocus(e) {
    setCardData({ ...cardData, focus: e.target.name });
  }

  function handleInputChange(e) {
    let { name, value } = e.target;
    if (name === "number") {
      value = formatCreditCardNumber(value);
    }
    if (name === "expiry") {
      value = formatExpirationDate(value);
    }
    if (name === "cvv") {
      value = formatCVC(value);
    }
    console.log(cardData);
    setCardData({ ...cardData, [name]: value });
  }

  return (
    <>
      <Container isVisible={hasTicket}>
        <Subttitle>Pagamento</Subttitle>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <CardContainer>
            <Card
              cvc={cardData.cvc}
              expiry={cardData.expiry}
              focused={cardData.focused}
              name={cardData.name}
              number={cardData.number}
            />
            <FormWrapper onSubmit={handleSubmit}>
              <StyledInputWraper>
                <Input
                  type="tel"
                  name="number"
                  placeholder="Número do Cartão"
                  pattern="[\d| ]{16,22}"
                  value={cardData.number}
                  required
                  onChange={handleInputChange}
                />
                <p>E.g.: 49..., 51..., 36..., 37...</p>
              </StyledInputWraper>
              <InputWrapper>
                <Input
                  type="text"
                  name="name"
                  placeholder="Nome"
                  value={cardData.name}
                  required
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
              </InputWrapper>
              <InputContainer>
                <InputWrapper>
                  <Input
                    type="tel"
                    name="expiry"
                    placeholder="Válido até"
                    pattern="\d\d/\d\d"
                    value={cardData.expiry}
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
                    value={cardData.cvc}
                    required
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                  />
                </InputWrapper>
              </InputContainer>
              <input type="hidden" name="issuer" value={cardData.issuer} />
            </FormWrapper>
          </CardContainer>
          <SubmitContainer>
            <PaymentButton disabled={dynamicInputIsLoading} type="submit">
              FINALIZAR PAGAMENTO
            </PaymentButton>
          </SubmitContainer>
        </MuiPickersUtilsProvider>
      </Container>
    </>
  );
}

const PaymentButton = styled(Button)`
  margin-top: 20px;
  height: 38px;
`;

const Subttitle = styled.div`
  color: #8e8e8e;
  margin: 30px 0 20px 0;
  width: 100%;
  text-align: left;
  font-size: 1.25rem;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
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

const SubmitContainer = styled.div`
  margin-top: 40px !important;
  width: 100% !important;

  > button {
    margin-top: 0 !important;
  }
`;

const Container = styled.div`
  display: ${(props) => (props.isVisible === "true" ? "block" : "none")};
`;
const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const StyledInputWraper = styled(InputWrapper)`
  > p {
    margin: 8px 0 4px 0;
    font-weight: normal;
    color: #8e8e8e;
  }
`;

const InputContainer = styled.div`
  display: flex;
`;
