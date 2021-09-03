import styled from "styled-components";

export default function HotelsLayout({ children }) {
  return (
    <Page>
      {children}
    </Page>
  );
}

const Page = styled.div`
    display: flex;
    flex-direction: column;
    
    padding: 0;

    & > * {
        text-align: initial;
    }

    @media (max-width: 600px) {
        flex-direction: column-reverse;
    }

    h2{
        font-style: normal;
        font-weight: normal;
        font-size: 34px;
        line-height: 40px;
        color: #000000;
    }
`;
