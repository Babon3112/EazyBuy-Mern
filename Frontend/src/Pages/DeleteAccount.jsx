import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcements from "../components/Announcements";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";
import { deleteAccount } from "../redux/apiCalls";
import { useDispatch } from "react-redux";

const Container = styled.div`
  background-color: #f4f4f4;
`;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Card = styled.div`
  background-color: #ffffff;
  padding: 30px;
  margin: 30px 0;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #333333;
`;

const Message = styled.p`
  font-size: 1.1rem;
  margin-bottom: 20px;
  color: #555555;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  padding: 15px;
  margin-bottom: 20px;
  width: 100%;
  border: 1px solid #dddddd;
  border-radius: 8px;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 15px 40px;
  background-color: #ca1a1a;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 1.1rem;
  &:hover {
    background-color: #e90c0c;
  }
`;

const DeleteAccount = () => {
  const [confirmation, setConfirmation] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setConfirmation(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (confirmation === "DELETE") {
      if (!password) {
        setMessage("Please enter your password.");
        return;
      }
      deleteAccount(dispatch, password).then(() => window.location.reload());
    } else {
      setMessage("Please type DELETE to confirm account deletion.");
    }
  };

  return (
    <Container>
      <Announcements />
      <Navbar />
      <Wrapper>
        <Card>
          <Title>Delete Your Account</Title>
          <Message>
            To confirm deletion, please type "DELETE" in the box below:
          </Message>
          <Form onSubmit={handleSubmit}>
            <Input
              type="text"
              value={confirmation}
              onChange={handleChange}
              placeholder="Type DELETE here"
            />
            <Message>
              To confirm deletion, please enter your password:
            </Message>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
            <Button type="submit">Delete Account</Button>
          </Form>
          <Message>{message}</Message>
        </Card>
      </Wrapper>
      <NewsLetter />
      <Footer />
    </Container>
  );
};

export default DeleteAccount;
