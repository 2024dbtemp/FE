import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { addUser } from "../api/users";

const SignupWrapper = styled.div`
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

const Signup = () => {
  const [name, setName] = useState("");
  const [cno, setCno] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const usenavigate = useNavigate();

  const onLogin = () => {
    usenavigate("/login");
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if (name === "cno") {
      setCno(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "phone") {
      setPhone(value);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await addUser({
        name: name,
        cno: cno,
        password: password,
        phoneNumbers: phone,
      });
      onLogin();
    } catch (error) {
      console.error("Failed to sign up:", error);
    }
  };

  return (
    <SignupWrapper>
      <Header>
        <Logo>C-ON</Logo>
        <Subtitle>CNU Order Now</Subtitle>
      </Header>
      <Form onSubmit={onSubmit}>
        <InputWrapper>
          <Input
            onChange={onChange}
            type="text"
            name="cno"
            value={cno}
            placeholder="고객 번호"
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            onChange={onChange}
            name="name"
            type="text"
            value={name}
            placeholder="이름"
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            onChange={onChange}
            type="text"
            name="phone"
            value={phone}
            placeholder="전화번호"
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            onChange={onChange}
            type="password"
            name="password"
            value={password}
            placeholder="비밀번호"
          />
        </InputWrapper>
        <Button type="submit">회원가입</Button>
        <SignUpLink onChange={onChange} onClick={onLogin}>
          로그인
        </SignUpLink>
      </Form>
    </SignupWrapper>
  );
};

export default Signup;
