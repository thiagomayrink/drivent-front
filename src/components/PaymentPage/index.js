import React, { useContext } from "react";
import Card from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";

import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
} from "./utils";

import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { toast } from "react-toastify";
import useApi from "../../hooks/useApi";

import Input from "../Form/Input";
import { FormWrapper } from "./FormWrapper";
import { useForm } from "../../hooks/useForm";
import { ErrorMsg } from "./ErrorMsg";
import FormValidations from "./FormValidations";
import UserContext from "../../contexts/UserContext";
import { useHistory } from "react-router";

import {
  StyledHeader,
  OrderSummary,
  Container,
  SubmitContainer,
  PaymentButton,
  CardContainer,
  StyledInputWraper,
  InputContainer,
  Subttitle,
  CheckoutContainer,
  ConfirmationMessage,
  CheckoutIcon,
} from "./styles/styles";
import PaymentLayout from "../../layouts/Payment";

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
      <PaymentLayout>
        <StyledHeader>
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
        </StyledHeader>
      </PaymentLayout>
    );
  } else if (paymentDone) {
    return (
      <>
        <Subttitle>Ingresso escolhido</Subttitle>
        <OrderSummary>
          <span>
            {modalityName === "presential" ? "Presencial" : "Online"} +{" "}
            {accomodationName === "withHotel" ? "Com Hotel" : "Sem Hotel"}
          </span>
          <p>R$ {totalPrice / 100}</p>
        </OrderSummary>
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
