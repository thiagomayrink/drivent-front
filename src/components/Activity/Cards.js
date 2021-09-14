import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { VscError } from "react-icons/vsc";
import { IoEnterOutline } from "react-icons/io5";

export default function Cards({ activities, locations, dayId }) {
  const [selected, setSelected] = useState(false);
  return (
    <>
      {locations.map((location) => {
        return (
          <Container key={location.id}>
            {activities
              .filter(
                (activity) =>
                  location.id === activity.locationId &&
                  activity.eventDayId === dayId
              )
              .map((card) => (
                <Card>
                  <div>
                    <h2>{card.name}</h2>
                    <h3>
                      {card.startDate} - {card.endDate}
                    </h3>
                  </div>
                  <div>
                    {card.vacancy === 0 ? (
                      <>
                        <SoldOut />
                        <p availability={selected}>Esgotado</p>
                      </>
                    ) : (
                      <>
                        <Available />
                        <p availability={selected}>{card.vacancy} vagas</p>
                      </>
                    )}
                  </div>
                </Card>
              ))}
          </Container>
        );
      })}
    </>
  );
}

const Container = styled.div`
  height: 100%;
  width: 288px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 10px;
  border: 1px solid #d7d7d7;

  :first-child {
    border-right: none;
  }

  :last-child {
    border-left: none;
  }
`;

const Card = styled.div`
  height: 100px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0px 10px 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  background: #f1f1f1;

  h2,
  h3 {
    font-size: 12px;
    font-weight: 700;
    line-height: 14px;
    text-align: left;
    color: #343434;
  }

  h2 {
    font-weight: 700;
    margin-bottom: 6px;
  }

  h3 {
    font-weight: 400;
  }

  p {
    font-size: 9px;
    line-height: 11px;
    color: ${(props) => (props.availability ? "#cc6666" : "#078632")};
  }

  div {
    width: 75%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    border-right: 1px solid #cfcfcf;
    padding-right: 5px;
  }

  div:last-child {
    width: 25%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-right: none;
    padding-left: 5px;
  }
`;

const SoldOut = styled(VscError)`
  font-size: 16px;
  margin-bottom: 3px;
  color: #cc6666;
  cursor: pointer;
`;

const Available = styled(IoEnterOutline)`
  font-size: 16px;
  margin-bottom: 3px;
  color: #078632;
  cursor: pointer;
`;
