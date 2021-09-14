import React from "react";
import { MdMoodBad } from "react-icons/md";
import { useFiles } from "../../contexts/FilesContext";
import styled from "styled-components";

export default function Picture() {
  const { pictureUrl } = useFiles();

  if (!pictureUrl) {
    return (
      <span>
        <MdMoodBad
          style={{ marginLeft: "45%" }}
          size={66}
          color="#d5d2d2"
        />
      </span>
    );
  }
  return (
    <Preview src={pictureUrl} />
  );
};

const Preview = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 5px;
  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
`;
