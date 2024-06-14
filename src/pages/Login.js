import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { authUser } from "../api/users";

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  height: 100vh;
  width: 100%;
`;

const Header = styled.header`
  background-color: #004098;
  width: 100%;
  height: 30vh;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
  color: white;
`;

const Logo = styled.h1`
  font-size: 4rem;
  margin: 0;
`;

const Subtitle = styled.p`
  font-size: 2rem;
  margin: 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  margin-top: 30px;
`;

const InputWrapper = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

const Input = styled.input`
  box-sizing: border-box;
  padding: 15px;
  width: 100%;
  border: 1.5px solid #004098;
  border-radius: 35px;
  outline: none;
  font-size: 1rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 15px;
  border: none;
  border-radius: 30px;
  background-color: #004098;
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 20px;

  &:hover {
    background-color: #00306d;
  }
`;

const SignUpLink = styled.a`
  font-size: 1rem;
  color: #6a6a6a;
  cursor: pointer;
  margin-left: auto;
`;

const Login = () => {
  const [cno, setCno] = useState("");
  const [password, setPassword] = useState("");
  const usenavigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "cno") {
      setCno(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSumbit = async (e) => {
    e.preventDefault();
    try {
      await authUser({ cno: cno, password: password });
      if (cno === "C0") {
        usenavigate("/admin");
      }
      usenavigate("/");
    } catch (error) {
      console.error("Failed to login:", error);
    }
  };

  const onSignUp = () => {
    usenavigate("/signup");
  };

  return (
    <LoginWrapper>
      <Header>
        <Logo>C-ON</Logo>
        <Subtitle>CNU Order Now</Subtitle>
      </Header>
      <Form onSubmit={onSumbit}>
        <InputWrapper>
          <Input
            name="cno"
            onChange={onChange}
            type="text"
            placeholder="고객 번호"
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            name="password"
            onChange={onChange}
            type="password"
            placeholder="비밀번호"
          />
        </InputWrapper>
        <Button type="submit">로그인</Button>
        <SignUpLink onClick={onSignUp}>회원가입</SignUpLink>
      </Form>
    </LoginWrapper>
  );
};

export default Login;
