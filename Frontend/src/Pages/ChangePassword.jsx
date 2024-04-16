import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { userRequest } from "../requestMethod";

const Container = styled.div``;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Div = styled.div`
  background-color: #f9f9f9;
  padding: 20px;
  margin: 30px 0;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  color: #333;
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  color: #555;
  margin-bottom: 8px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 16px;
  font-size: 16px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const Message = styled.div`
  color: green;
  font-size: 18px;
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center;
`;

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newConfirmPassword, setNewConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== newConfirmPassword) {
      alert("Password and confirm password do not match");
      return;
    }

    try {
      await userRequest.post("/users/change-password", {
        currentPassword,
        newPassword,
      });

      setSuccessMessage("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setNewConfirmPassword("");
    } catch (error) {
      console.error("Error changing password:", error);
    }
  };

  return (
    <Container>
      <Navbar />
      <Wrapper>
        <Div>
          <Title>Change Password</Title>
          {successMessage && <Message>{successMessage}</Message>}
          <Form>
            <Label htmlFor="current_password">Current Password:</Label>
            <Input
              type="password"
              id="current_password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
            <Label htmlFor="new_password">New Password:</Label>
            <Input
              type="password"
              id="new_password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <Label htmlFor="confirm_password">Confirm New Password:</Label>
            <Input
              type="password"
              id="confirm_password"
              value={newConfirmPassword}
              onChange={(e) => setNewConfirmPassword(e.target.value)}
              required
            />
            <Button type="submit" onClick={handleSubmit}>
              Change Password
            </Button>
          </Form>
        </Div>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default ChangePassword;
