import React from "react";
import styled from "styled-components";
import { Badge } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";
import { mobile } from "../responsive";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/apiCalls";
import LogoutIcon from "@mui/icons-material/Logout";

const Container = styled.div`
  height: 60px;
  background-color: #f3f3f3;
  border-bottom: 1px solid #ccc;
`;

const Wrapper = styled.div`
  display: flex;
  padding: 10px 20px;
  align-items: center;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  color: #666;
  margin-right: 20px;

  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  padding: 5px;
  display: flex;
  align-items: center;
  border: 1px solid lightgray;
  border-radius: 5px;

  ${mobile({ marginLeft: "15px" })}
`;

const Input = styled.input`
  border: none;
  outline: none;
  font-size: 14px;
  margin-left: 5px;
  background-color: #f3f3f3;

  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  color: #333;
  font-size: 25px;

  ${mobile({ fontSize: "25px" })}
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  ${mobile({ flex: "1.5", justifyContent: "center" })}
`;

const MenuItem = styled.div`
  display: flex;
  font-size: 14px;
  cursor: pointer;
  font-weight: 500;
  align-items: center;
  color: #666;
  transition: all 0.3s ease;
  margin-left: 25px;

  &:hover {
    color: #333;
  }

  ${mobile({ fontSize: "10px", marginLeft: "12px", fontWeight: 600 })}
`;

const Image = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 0 10px;
`;

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  let user = useSelector((state) => state.user.currentUser);
  if (user) user = user.data;

  const dispatch = useDispatch();

  const handleLogout = (e) => {
    logout(dispatch);
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" id="search" />
            <SearchIcon style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo>EazyBuy.</Logo>
        </Center>
        <Right>
          <Link to="/cart" style={{ textDecoration: "none", color: "black" }}>
            <MenuItem>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartTwoToneIcon />
              </Badge>
            </MenuItem>
          </Link>
          {user === null ? (
            <>
              <Link
                to="/register"
                style={{ textDecoration: "none", color: "black" }}
              >
                <MenuItem>REGISTER</MenuItem>
              </Link>
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "black" }}
              >
                <MenuItem>SIGN IN</MenuItem>
              </Link>
            </>
          ) : (
            <>
              <Link to="/your-account" style={{ textDecoration: "none", color: "black" }}>
                <MenuItem>
                  <Image src={user.avatar} />
                </MenuItem>
              </Link>
              <Link
                to="/"
                style={{ textDecoration: "none", color: "black" }}
                onClick={handleLogout}
              >
                <MenuItem>
                  Log Out
                  <LogoutIcon fontSize="" />
                </MenuItem>
              </Link>
            </>
          )}
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
