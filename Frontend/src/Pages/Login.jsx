import React, { useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/apiCalls";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9YOA2B0bOyzlhJ1KQYhfClIo9wpqWrOXTC86RY838BcqQE8VBocyiqSYW3fpHFInu_gw&usqp=CAU")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 300px;
  padding: 20px;
  background-color: #fff;

  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 25px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const ButtonMiddle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 20px 20px;
  margin: 5px 0;
  color: white;
  background-color: teal;
  font-size: 15px;
  cursor: pointer;
  &:disabled {
    background-color: rgba(0, 128, 128, 0.5);
    cursor: not-allowed;
  }
`;

const Span = styled.span`
  margin: 5px 0;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  color: blue;
  text-decoration: underline;
`;

const Error = styled.span`
  color: red;
  text-align: center;
`;

const signIn = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const { isFetching, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
    if (isEmail) {
      login(dispatch, { email: identifier, password });
    } else {
      login(dispatch, { mobileNo: identifier, password });
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input
            placeholder="Email or MobileNo"
            onChange={(e) => setIdentifier(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <Error>Something Went Wrong.....</Error>}
          <ButtonMiddle>
            <Button onClick={handleLogin} disabled={isFetching}>
              Log IN
            </Button>
          </ButtonMiddle>
          <Link>
            <Span>FORGOT PASSWORD?</Span>
          </Link>
          <Link to="/register">
            <Span>CREATE A NEW ACCOUNT</Span>
          </Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default signIn;
