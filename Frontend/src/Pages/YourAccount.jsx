import React, { useState } from "react";
import styled from "styled-components";
import Announcements from "../components/Announcements";
import Navbar from "../components/Navbar";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { updateAccount } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { userRequest } from "../requestMethod";

const Container = styled.div`
  background-color: #f4f4f4;
`;

const Wrapper = styled.div`
  padding: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
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
  width: 400px;
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
  const userDetails = useSelector((state) => state.user.currentUser.data.user);

  const [avatar, setAvatar] = useState(null);
  const [fullName, setFullName] = useState(userDetails.fullName);
  const [userName, setUserName] = useState(userDetails.userName);
  const [mobileNo, setMobileNo] = useState(userDetails.mobileNo);
  const [email, setEmail] = useState(userDetails.email);
  const dispatch = useDispatch();

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  const isValidMobile = (mobile) => {
    const re = /^[0-9]{10}$/;
    return re.test(mobile);
  };

  const isValidEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!isValidMobile(mobileNo)) {
      alert("Please enter a valid mobile number");
      return;
    }

    if (!isValidEmail(email)) {
      alert("Please enter a valid email address");
      return;
    }

    const formData = new FormData();
    if (fullName !== userDetails.fullName)
      formData.append("fullName", fullName);
    if (userName !== userDetails.userName)
      formData.append("userName", userName);
    if (mobileNo !== userDetails.mobileNo)
      formData.append("mobileNo", mobileNo);
    if (email !== userDetails.email) formData.append("email", email);
    if (avatar) formData.append("avatar", avatar);

    try {
      await updateAccount(dispatch, formData).then(() =>
        window.location.reload()
      );
    } catch (error) {}
  };

  return (
    <Container>
      <Announcements />
      <Navbar />
      <Wrapper>
        <Div>
          <AvatarLabel>
            {avatar ? (
              <AvatarPreview src={URL.createObjectURL(avatar)} />
            ) : (
              <AvatarPreview
                src={
                  userDetails.avatar ||
                  "https://res.cloudinary.com/arnabcloudinary/image/upload/v1713075500/EazyBuy/Avatar/upload-avatar.png"
                }
              />
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
            id="Full name"
            placeholder={userDetails.fullName}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <Input
            type="text"
            id="username"
            placeholder={userDetails.userName}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <Input
            type="tel"
            id="mobile no"
            placeholder={userDetails.mobileNo}
            value={mobileNo}
            onChange={(e) => setMobileNo(e.target.value)}
          />
          <Input
            type="email"
            id="email"
            placeholder={userDetails.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <SubmitButton onClick={handleUpdate}>Update Details</SubmitButton>
        </Div>
      </Wrapper>
      <NewsLetter />
      <Footer />
    </Container>
  );
};

export default YourAccount;
