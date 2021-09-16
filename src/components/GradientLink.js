import Link from "./Link";
import styled from "styled-components";

export default styled(Link)`
  :hover {
    color: #000;
    -webkit-background-clip: none;
    -webkit-text-fill-color: black;
    -moz-background-clip: none;
    -moz-text-fill-color: black;
  }

  background-image: linear-gradient(45deg, #ff3191, #ffb27f);
  background-size: 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-background-clip: text;
  -moz-text-fill-color: transparent;
`;
