import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { Button, Input, Logo } from "../../components";
import { Link, useNavigate } from "react-router-dom";
import API from "../../services/api";
import { AxiosError } from "axios";
import { ErrorBack } from "../../services/type";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.body};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LinkStyled = styled(Link)`
  margin-top: 8px;
  text-decoration: none;
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;
const Form = styled.div`
  width: 328px;
  height: 316px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgcontainer};
  border-radius: 16px;
  padding: 8px;
  box-sizing: border-box;
  animation: 0.5s ${fadeIn} ease-in;
`;
const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsloading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const sendFrom = async () => {
    setIsloading(true);

    const user = {
      name,
      email,
    };
    try {
      const { data } = await API.post(`/user`, user);
      sessionStorage.setItem("user", JSON.stringify(data));
      navigate("/");
    } catch (err) {
      const error = err as AxiosError;
      const errorBack = error.response?.data as ErrorBack;
      alert(errorBack.message);
    } finally {
      setIsloading(false);
    }
  };

  // const goToHome = () => {
  //   navigate("/");
  // };
  return (
    <Wrapper>
      <Form>
        <Logo />
        <Input
          placeholder="Introduce tu nombre"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <Input
          type="email"
          placeholder="Introduce tu correo"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Button isLoading={isLoading} onClick={() => sendFrom()}>
          Registrarme
        </Button>

        <LinkStyled to="/sign-in">¿Ya te registraste? inicia sesión</LinkStyled>
      </Form>
    </Wrapper>
  );
};

export default Login;
