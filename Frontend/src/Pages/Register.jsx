import React, { useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { register } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("") center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: #fff;

  ${mobile({ width: "75%", height: "57%" })}
`;

const Title = styled.h1`
  font-size: 25px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Div = styled.div`
  width: 100%;
  padding: 10px 0 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Span = styled.span`
  padding-right: 20px;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
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
  color: white;
  background-color: teal;
  font-size: 15px;
  cursor: pointer;

  ${mobile({ width: "60%" })}
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

  const isValidMobile = (mobile) => {
    const re = /^[0-9]{10}$/;
    return re.test(mobile);
  };

  const isValidEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
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

    register(dispatch, {
      fullName,
      userName,
      mobileNo,
      email,
      password,
      avatar,
    });
  };

  if (Register) {
    return <Navigate to="/login" />;
  }

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Div className="addProductItem">
            <Span>
              <h4>Avatar</h4>
            </Span>
            <input type="file" onChange={(e) => setAvatar(e.target.files[0])} />
          </Div>
          <Input
            type="text"
            placeholder="Full name"
            onChange={(e) => setFullName(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Username"
            onChange={(e) => setUserName(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Mobile no."
            onChange={(e) => setMobileNo(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
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
              Create an Account
            </Button>
          </ButtonMiddle>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
