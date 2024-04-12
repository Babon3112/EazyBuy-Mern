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

  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  display: flex;
  padding: 10px 20px;
  align-items: center;
  justify-content: space-between;
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

  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  padding: 5px;
  display: flex;
  margin-left: 25px;
  align-items: center;
  border: 1px solid lightgray;

  ${mobile({ marginLeft: "15px" })}
`;

const Input = styled.input`
  border: none;

  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;

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
  margin-left: 25px;
  font-weight: 500;
  align-items: center;

  ${mobile({ fontSize: "10px", marginLeft: "12px", fontWeight: 600 })}
`;

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state.user.currentUser);

  const dispatch = useDispatch();

  const handleLogin = (e) => {
    logout(dispatch);
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <SearchIcon style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo>EazyBuy.</Logo>
        </Center>
        <Right>
          {user === null ? (
            <>
              <Link to="/register" style={{ textDecoration: 'none', color:"black" }}>
                <MenuItem>REGISTER</MenuItem>
              </Link>
              <Link to="/login" style={{ textDecoration: 'none', color:"black" }}>
                <MenuItem>SIGN IN
                </MenuItem>
              </Link>
            </>
          ) : (
            <Link to="/" style={{ textDecoration: 'none', color:"black" }}>
              <MenuItem onClick={handleLogin}>Log Out
              <LogoutIcon fontSize=""/>
              </MenuItem>
            </Link>
          )}
          <Link to="/cart" style={{ textDecoration: 'none', color:"black" }}>
            <MenuItem>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartTwoToneIcon />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
