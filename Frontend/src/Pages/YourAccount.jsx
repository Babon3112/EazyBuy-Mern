import React, { useState } from "react";
import styled from "styled-components";
import Announcements from "../components/Announcements";
import Navbar from "../components/Navbar";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import { mobile } from "../responsive";

const Container = styled.div`
  background-color: #f9f9f9;
  min-height: 100vh;
`;

const CenteredDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const AvatarInput = styled.input`
  display: none;
`;

const AvatarLabel = styled.label`
  margin: 20px;
  cursor: pointer;
  text-align: center;
`;

const AvatarPreview = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin: 20px;
  object-fit: cover;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  width: 500px;
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  color: #333;
  background-color: #f5f5f5;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
  }

  ${mobile({ width: "80%" })}
`;

const SubmitButton = styled.button`
  width: 200px;
  padding: 15px;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  color: #fff;
  background-color: teal;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0e9c9c;
  }
`;

const YourAccount = () => {
  const user = useSelector((state) => state.user.currentUser.loggedinUser);
  const [avatar, setAvatar] = useState(null);
  const [fullName, setFullName] = useState(user.fullName);
  const [userName, setUserName] = useState(user.userName);
  const [mobileNo, setMobileNo] = useState(user.mobileNo);
  const [email, setEmail] = useState(user.email);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
  };

  return (
    <Container>
      <Announcements />
      <Navbar />
      <CenteredDiv>
        <AvatarLabel>
          {avatar ? (
            <AvatarPreview src={URL.createObjectURL(avatar)} />
          ) : (
            <AvatarPreview src={user.avatar} />
          )}
          <AvatarInput
            type="file"
            id="avatar"
            accept="image/*"
            onChange={handleAvatarChange}
          />
        </AvatarLabel>
        <Input
          type="text"
          placeholder={user.fullName}
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <Input
          type="text"
          placeholder={user.userName}
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <Input
          type="tel"
          placeholder={user.mobileNo}
          value={mobileNo}
          onChange={(e) => setMobileNo(e.target.value)}
        />
        <Input
          type="email"
          placeholder={user.email}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <SubmitButton onClick={handleUpdate}>Update Details</SubmitButton>
      </CenteredDiv>
      <NewsLetter />
      <Footer />
    </Container>
  );
};

export default YourAccount;
