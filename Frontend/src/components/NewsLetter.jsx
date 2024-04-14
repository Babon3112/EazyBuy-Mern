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
  font-size: 4.5rem;
  margin-bottom: 2rem;
  color: #333;

  ${mobile({ fontSize: "3.5rem" })}
`;

const Description = styled.div`
  font-size: 1.5rem;
  font-weight: 300;
  margin-bottom: 2rem;
  text-align: center;
`;

const InputContainer = styled.div`
  width: 50%;
  height: 4rem;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  border: 1px solid #ddd;
  border-radius: 2rem;

  ${mobile({ width: "80%", height: "3rem" })}
`;

const Input = styled.input`
  border: none;
  flex: 9;
  padding: 1rem;
  font-size: 1.6rem;
  ${mobile({ fontSize: "1.3rem" })}
`;

const Button = styled.button`
  flex: 1;
  cursor: pointer;
  border: none;
  background-color: teal;
  color: white;
  border-radius: 0 5% 5px 0;
`;

const NewsLetter = () => {
  return (
    <Container>
      <Title>NewsLetter</Title>
      <Description>Get timely updates from your products</Description>
      <InputContainer>
        <Input placeholder="Your email" id="send-mesage" />
        <Button>
          <SendTwoToneIcon />
        </Button>
      </InputContainer>
    </Container>
  );
};

export default NewsLetter;
