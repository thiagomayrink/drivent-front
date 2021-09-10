import styled from "styled-components";

export default function CardLayout({ children, selected, onClick }) {
  return (
    <ContainerCard selected={selected} onClick={onClick}>
      {children}
    </ContainerCard>
  );
}

const ContainerCard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 196px;
    height: 264px;
    background: ${props => props.selected ? "#FFEED2" : "#F1F1F1"};
    border-radius: 10px;
    padding: 16px 14px;
    cursor: pointer;
    margin-right: 20px;

    font-weight: normal;
    font-size: 12px;
    line-height: 14px;
    color: #3C3C3C;

    img{
        width: 168px;
        height: 109px;
        border-radius: 5px;
    }

    h3{
        font-size: 20px;
        line-height: 23px;
        color: #343434;
    }

    strong{
        font-weight: bold;
    }
`;
