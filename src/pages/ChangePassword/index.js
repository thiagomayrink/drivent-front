import { useState, useContext } from "react";
import { toast } from "react-toastify";

import AuthLayout from "../../layouts/Auth";

import Input from "../../components/Form/Input";
import Button from "../../components/Form/Button";
import Link from "../../components/Link";
import { Row, Title, Label } from "../../components/Auth";

import EventInfoContext from "../../contexts/EventInfoContext";

import useApi from "../../hooks/useApi";
import GradientLink from "../../components/GradientLink";
import { useHistory, useParams } from "react-router";

export default function ChangePassword() {
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [didPasswordReset, setDidPasswordReset] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const history = useHistory();

  const { token: ChangePasswordToken } = useParams();
  const api = useApi();

  const { eventInfo } = useContext(EventInfoContext);

  function submit(event) {
    event.preventDefault();
    setLoadingButton(true);

    if (password !== confirmationPassword) {
      toast("As senhas devem coincidir!");
      setLoadingButton(false);
      return;
    }
    if (password.length < 6) {
      toast("As senhas devem conter no mínimo 6 caracteres!");
      setLoadingButton(false);
      return;
    }

    api.user
      .changePassword(ChangePasswordToken, password)
      .then((response) => {
        if (response.status === 200) {
          setDidPasswordReset(true);
          setTimeout(() => history.push("/sign-in"), 2500);
        }
      })
      .catch((error) => {
        /* eslint-disable-next-line no-console */
        console.error(error);

        if (error.response) {
          const message = error.response.data.message;
          toast(message);
          setLoadingButton(false);
        } else {
          toast("Não foi possível conectar ao servidor!");
          setLoadingButton(false);
        }
      });
  }

  return (
    <AuthLayout background={eventInfo.backgroundImage}>
      <Row>
        <img src={eventInfo.logoImage} alt="Event Logo" />
        <Title>{eventInfo.eventTitle}</Title>
      </Row>
      {didPasswordReset ? (
        <>
          <Row>
            <Label>Sua senha foi atualizada</Label>
          </Row>
          <Row>
            <Label>
              Parabéns! <br />
              Você já pode fazer login com a sua nova senha.
            </Label>
          </Row>
        </>
      ) : (
        <Row>
          <Label>Digite sua nova senha</Label>
          <form onSubmit={submit}>
            <Input
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              label="Confirm Password"
              type="password"
              fullWidth
              value={confirmationPassword}
              onChange={(e) => setConfirmationPassword(e.target.value)}
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
      {didPasswordReset ? (
        <Row>
          <GradientLink to="/sign-in">Ir para página de login</GradientLink>
        </Row>
      ) : (
        <></>
      )}
      <Row>
        <Link to="/enroll">Não possui login? Inscreva-se</Link>
      </Row>
    </AuthLayout>
  );
}
