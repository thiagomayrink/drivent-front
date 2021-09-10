import styled from "styled-components";
import { Typography } from "@material-ui/core";
import { FaCheckCircle } from "react-icons/fa";
import Button from "../../Form/Button";
import { InputWrapper } from "../InputWrapper";

const StyledHeader = styled(Typography)`
  margin-bottom: 36px !important;
`;

const OrderSummary = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-bottom: 30px;
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
  margin-bottom: 20px;
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

export {
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
};
