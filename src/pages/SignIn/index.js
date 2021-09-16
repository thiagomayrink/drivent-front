import { useState, useContext } from "react";
import { toast } from "react-toastify";

import AuthLayout from "../../layouts/Auth";

import Input from "../../components/Form/Input";
import Button from "../../components/Form/Button";
import Link from "../../components/Link";
import { Row, Title, Label } from "../../components/Auth";

import EventInfoContext from "../../contexts/EventInfoContext";
import UserContext from "../../contexts/UserContext";

import useApi from "../../hooks/useApi";
import styled from "styled-components";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingSignIn, setLoadingSignIn] = useState(false);

  const api = useApi();

  const { eventInfo } = useContext(EventInfoContext);
  const { setUserData } = useContext(UserContext);

  function submit(event) {
    event.preventDefault();
    setLoadingSignIn(true);

    api.auth
      .signIn(email, password)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        /* eslint-disable-next-line no-console */
        console.error(error);

        if (error.response) {
          const message = error.response.data.message;
          toast(message);
        } else {
          toast("Não foi possível conectar ao servidor!");
        }
      })
      .then(() => {
        setLoadingSignIn(false);
      });
  }

  return (
    <AuthLayout background={eventInfo.backgroundImage}>
      <Row>
        <img src={eventInfo.logoImage} alt="Event Logo" />
        <Title>{eventInfo.eventTitle}</Title>
      </Row>
      <Row>
        <Label>Entrar</Label>
        <form onSubmit={submit}>
          <Input
            label="E-mail"
            type="text"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Senha"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            color="primary"
            fullWidth
            disabled={loadingSignIn}
          >
            Entrar
          </Button>
        </form>
      </Row>
      <Row>
        <StyledLink to="/forgot-password">
          Esqueceu a senha? <br />
          Clique aqui para recuperar
        </StyledLink>
      </Row>
      <Row>
        <Link to="/enroll">Não possui login? Inscreva-se</Link>
      </Row>
    </AuthLayout>
  );
}

const StyledLink = styled(Link)`
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
