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

//회원가입을 위한 컴포넌트
const Signup = () => {
  const [name, setName] = useState("");
  const [cno, setCno] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const usenavigate = useNavigate();

  //로그인 버튼을 누르면 로그인 페이지로 이동
  const onLogin = () => {
    usenavigate("/login");
  };

  //Input 태그를 통해 입력받은 데이터를 이용해 상태 업데이트
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

  //입력받은 데이터를 addUser에 넘겨 회원가입한 고객 정보를 서버에 넘기도록 함
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await addUser({
        name: name,
        cno: cno,
        password: password,
        phoneNumbers: phone,
      });
      //회원가입이 완료되면 로그인 페이지로 이동
      onLogin();
    } catch (error) {
      console.error("Failed to sign up:", error);
    }
  };

  return (
    //Input 태그를 통해 사용자 입력을 받을 수 있게 함
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
