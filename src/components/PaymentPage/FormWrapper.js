import styled from "styled-components";

export const FormWrapper = styled.form`
  display: flex;
  width: fit-content;

  @media (max-width: 600px) {
    > div {
      width: 100%;
      padding-left: 0px !important;
    }
  }
`;
