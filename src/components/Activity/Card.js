import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { VscError } from "react-icons/vsc";
import { IoEnterOutline } from "react-icons/io5";
import { BiCheckCircle } from "react-icons/bi";

export default function Card({
  id,
  name,
  startDate,
  endDate,
  vacancy,
  activityId,
  setActivityId,
  eventDay,
  dayId,
  locationId,
  activityLocationId
}) {
  const [selected, setSelected] = useState(false);
  return (
    <ActivityCard selected={selected} onClick={() => setSelected(true)}>
      <div>
        <h2>{name}</h2>
        <h3>
          {startDate} - {endDate}
        </h3>
      </div>
      <div>
        {!selected ? (
          vacancy === 0 ? (
            <>
              <SoldOut />
              <p class="red">Esgotado</p>
            </>
          ) : (
            <>
              <Available />
              <p class="green">{vacancy} vagas</p>
            </>
          )
        ) : (
          <>
            <Check />
            <p class="green">Inscrito</p>
          </>
        )}
      </div>
    </ActivityCard>
  );
}

const ActivityCard = styled.div`
  height: 100px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0px 10px 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  background: ${(props) => (!props.selected ? "#f1f1f1" : "#D0FFDB")};
  cursor: pointer;

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
  }

  .red {
    color: #cc6666;
  }

  .green {
    color: #078632;
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
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 3px;
  color: #cc6666;
`;

const Available = styled(IoEnterOutline)`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 3px;
  color: #078632;
`;

const Check = styled(BiCheckCircle)`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 3px;
  color: #078632;
`;
