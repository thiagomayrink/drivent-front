import styled from "styled-components";

export default function HotelsLayout({ children }) {
  return <Page>{children}</Page>;
}

const Page = styled.div`
  height: 100%;
  width: 100%;
`;
