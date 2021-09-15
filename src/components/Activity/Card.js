import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { VscError } from "react-icons/vsc";
import { IoEnterOutline } from "react-icons/io5";
import { BiCheckCircle } from "react-icons/bi";
import { toast } from "react-toastify";

export default function Card({
  //   id,
  //   name,
  //   startDate,
  //   endDate,
  //   vacancy,
  //   activityId,
  //   setActivityId,
  activity,
  eventDay,
  dayId,
  locationId,
  activityLocationId,
  selectedActivities,
  setSelectedActivities,
}) {
  const { id, name, startDate, endDate, vacancy } = activity;
  const [selected, setSelected] = useState(false);

  const close = { autoClose: 2500 };

  console.log(selectedActivities);

  function selectActivity() {
    const start = parseFloat(startDate.split(":", [1]));
    const end = parseFloat(endDate.split(":", [1]));
    const selectedActivity = {
      id,
      name,
      start,
      end,
    };
    if (vacancy === 0) return toast("Esta atividade já esgotou!", close);
    else if (selected) {
      const updatedActivities = selectedActivities.filter(
        (act) => act.id !== id
      );
      setSelectedActivities(updatedActivities);
      setSelected(false);
    } else if (selectedActivities.length === 0) {
      setSelectedActivities([...selectedActivities, selectedActivity]);
      setSelected(true);
    } else {
      const same = selectedActivities.find(
        (act) =>
          start >= act.start &&
          start < act.end &&
          end > act.start &&
          end <= act.end
      );
      if (same)
        return toast("Há um conflito de horário entre as atividades!", close);
      else setSelectedActivities([...selectedActivities, selectedActivity]);
      setSelected(true);
    }
  }

  return (
    <ActivityCard key={id} selected={selected} onClick={selectActivity}>
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
              <p className="red">Esgotado</p>
            </>
          ) : (
            <>
              <Available />
              <p className="green">{vacancy} vagas</p>
            </>
          )
        ) : (
          <>
            <Check />
            <p className="green">Inscrito</p>
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
