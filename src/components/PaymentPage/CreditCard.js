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
  const [hasTicket, setHasTicket] = useState("true"); //rollback to false before commit;
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

  function handleCallback({ issuer }, _isValid) {
    if (issuer !== "unknown") {
      setData({ ...data, issuer: issuer });
    }
  }

  function handleInputFocus(e) {
    setData({ ...data, focused: e.target.name });
  }

  return (
    <>
      <Container isVisible={hasTicket}>
        <Subttitle>Pagamento</Subttitle>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <CardContainer>
            <Card
              cvc={data.cvc}
              expiry={data.expiry}
              focused={data.focused}
              name={data.name}
              number={data.number}
              callback={handleCallback}
            />
            <FormWrapper onSubmit={handleSubmit}>
              <StyledInputWraper>
                <Input
                  type="tel"
                  name="number"
                  placeholder="Número do Cartão"
                  pattern="[\d| ]{16,22}"
                  value={data.number}
                  required
                  onChange={(e) =>
                    customHandleChange(
                      "number",
                      formatCreditCardNumber
                    )(e.target.value)
                  }
                />
                <p>E.g.: 49..., 51..., 36..., 37...</p>
              </StyledInputWraper>
              <InputWrapper>
                <Input
                  type="text"
                  name="name"
                  placeholder="Nome"
                  value={data.name}
                  required
                  onChange={handleChange("name")}
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
                    value={data.expiry}
                    required
                    onChange={(e) =>
                      customHandleChange(
                        "expiry",
                        formatExpirationDate
                      )(e.target.value)
                    }
                    onFocus={handleInputFocus}
                  />
                </InputWrapper>
                <InputWrapper>
                  <Input
                    type="tel"
                    name="cvc"
                    placeholder="CVC"
                    pattern="\d{3,4}"
                    value={data.cvc}
                    required
                    onChange={(e) =>
                      customHandleChange("cvc", formatCVC)(e.target.value)
                    }
                    onFocus={handleInputFocus}
                  />
                </InputWrapper>
              </InputContainer>
              <input type="hidden" name="issuer" value={data.issuer} />
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
