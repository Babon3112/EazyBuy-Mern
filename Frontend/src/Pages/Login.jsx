import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";

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
  width: 25%;
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
`;

const Link = styled.a`
  margin: 5px 0;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  color: blue;
  text-decoration: underline;
`;

const Register = () => {
  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input placeholder="Username" />
          <Input placeholder="Password" />
          <ButtonMiddle>
            <Button>Log IN</Button>
          </ButtonMiddle>
          <Link>FORGOT PASSWORD?</Link>
          <Link>CREATE A NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
