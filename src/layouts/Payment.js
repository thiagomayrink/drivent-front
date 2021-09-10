import styled from "styled-components";

export default function PaymentLayout({ children }) {
  return <Page>{children}</Page>;
}

const Page = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
`;
