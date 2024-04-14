import React, { useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { register } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("https://source.unsplash.com/random") center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 40%;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgb(255, 255, 255);

  ${mobile({ width: "75%", height: "85%" })}
`;

const Title = styled.h1`
  text-align: center;
  font-size: 28px;
  font-weight: 400;
  margin-bottom: 20px;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px;
  padding: 15px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AvatarInput = styled.input`
  display: none;
`;

const AvatarLabel = styled.label`
  margin: 10px;
  cursor: pointer;
  text-align: center;
`;

const AvatarPreview = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 10px;
  object-fit: cover;
`;

const Agreement = styled.span`
  font-size: 14px;
  margin: 20px 0;
  color: #555;
`;

const ButtonMiddle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 0;
  color: white;
  background-color: teal;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #0e9c9c;
  }

  ${mobile({ width: "60%" })}
`;

const SignInLink = styled.p`
  margin-top: 20px;
  text-align: center;
  font-size: 14px;
  color: #333;
  text-decoration: underline;
  cursor: pointer;
`;

const Register = () => {
  const [avatar, setAvatar] = useState(null);
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [mobileNo, setMobileNo] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { loading, error, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isValidMobile = (mobile) => {
    const re = /^[0-9]{10}$/;
    return re.test(mobile);
  };

  const isValidEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (!isValidMobile(mobileNo)) {
      alert("Please enter a valid mobile number");
      return;
    }

    if (!isValidEmail(email)) {
      alert("Please enter a valid email address");
      return;
    }

    if (password !== confirmPassword) {
      alert("Password and confirm password do not match");
      return;
    }

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("userName", userName);
    formData.append("mobileNo", mobileNo);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("avatar", avatar);

    register(dispatch, formData);
  };

  const gotologin = () => {
    navigate("/login");
  };

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Div>
            {avatar ? (
              <AvatarLabel>
                <AvatarInput
                  type="file"
                  id="avatar"
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
                <AvatarPreview
                  src={URL.createObjectURL(avatar)}
                  alt="Avatar Preview"
                />
              </AvatarLabel>
            ) : (
              <AvatarLabel>
                <AvatarPreview src="https://res.cloudinary.com/arnabcloudinary/image/upload/v1713075500/EazyBuy/Avatar/upload-avatar.png" />
                <AvatarInput
                  type="file"
                  id="avatar"
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
              </AvatarLabel>
            )}
          </Div>
          <Input
            name="full-name"
            type="text"
            placeholder="Full name"
            onChange={(e) => setFullName(e.target.value)}
          />
          <Input
            name="user-name"
            type="text"
            placeholder="Username"
            onChange={(e) => setUserName(e.target.value)}
          />
          <Input
            name="mobile-no"
            type="number"
            placeholder="Mobile no."
            onChange={(e) => setMobileNo(e.target.value)}
          />
          <Input
            name="email-"
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            name="confirm-password"
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Agreement>
            By creating an account, I consent to the processing of your personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <ButtonMiddle>
            <Button onClick={handleRegister} disabled={loading}>
              {loading ? "Creating..." : "Create an Account"}
            </Button>
          </ButtonMiddle>
        </Form>
        <SignInLink onClick={gotologin}>
          Already have an account? Sign in
        </SignInLink>
      </Wrapper>
    </Container>
  );
};

export default Register;
