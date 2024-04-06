import React from "react";
import SendTwoToneIcon from "@mui/icons-material/SendTwoTone";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  height: 60vh;
  background-color: #fcf5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 70px;
  margin-bottom: 20px;
`;

const Description = styled.div`
  font-size: 25px;
  font-weight: 300;
  margin-bottom: 20px;

  ${mobile({ textAlign: "Center" })}
`;

const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  border: 1px solid gray;

  ${mobile({ width: "80%" })}
`;

const Input = styled.input`
  border: none;
  flex: 9;
  padding: 20px;
`;

const Button = styled.button`
  flex: 1;
  cursor: pointer;
  border: none;
  background-color: teal;
  color: white;
`;

const NewsLetter = () => {
  return (
    <Container>
      <Title>NewsLetter</Title>
      <Description>Get timely updates from your products</Description>
      <InputContainer>
        <Input placeholder="Your email" />
        <Button>
          <SendTwoToneIcon />
        </Button>
      </InputContainer>
    </Container>
  );
};

export default NewsLetter;
