import { useState, useContext } from "react";
import { toast } from "react-toastify";

import AuthLayout from "../../layouts/Auth";

import Input from "../../components/Form/Input";
import Button from "../../components/Form/Button";
import Link from "../../components/Link";
import { Row, Title, Label } from "../../components/Auth";

import EventInfoContext from "../../contexts/EventInfoContext";

import useApi from "../../hooks/useApi";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [requestedToken, setRequestedToken] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);

  const api = useApi();

  const { eventInfo } = useContext(EventInfoContext);

  function submit(event) {
    event.preventDefault();
    setLoadingButton(true);

    api.user
      .forgotPassword(email)
      .then((response) => {
        if (response.status === 201) {
          setRequestedToken(true);
        }
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
        setLoadingButton(false);
      });
  }

  return (
    <AuthLayout background={eventInfo.backgroundImage}>
      <Row>
        <img src={eventInfo.logoImage} alt="Event Logo" />
        <Title>{eventInfo.eventTitle}</Title>
      </Row>
      {requestedToken ? (
        <>
          <Row>
            <Label>Recuperação de senha</Label>
          </Row>
          <Row>
            <Label>
              Enviamos um email com as instruçôes de recuperação para{" "}
              {email || ""}.
            </Label>
          </Row>
        </>
      ) : (
        <Row>
          <Label>Digite seu Email</Label>
          <form onSubmit={submit}>
            <Input
              label="E-mail"
              type="text"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              type="submit"
              color="primary"
              fullWidth
              disabled={loadingButton}
            >
              Recuperar Senha
            </Button>
          </form>
        </Row>
      )}

      <Row>
        <Link to="/sign-in">Já está inscrito? Faça login</Link>
      </Row>
      <Row>
        <Link to="/enroll">Não possui login? Inscreva-se</Link>
      </Row>
    </AuthLayout>
  );
}
