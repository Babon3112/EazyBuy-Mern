import React, { useEffect, useRef, useState } from "react";
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
  object-fit: cover;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 105px;
  right: 5px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const DropdownItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f3f3f3;
  }
`;

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  let user = useSelector((state) => state.user.currentUser);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  let loggedUser;
  if (user) loggedUser = user.data.user;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = (e) => {
    logout(dispatch).then(() => window.location.reload());
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
            <div ref={dropdownRef}>
              <MenuItem onClick={toggleDropdown}>
                <Image
                  src={
                    loggedUser.avatar ||
                    "https://res.cloudinary.com/arnabcloudinary/image/upload/v1713075500/EazyBuy/Avatar/upload-avatar.png"
                  }
                />
              </MenuItem>
              {isDropdownOpen && (
                <DropdownMenu>
                  <Link
                    to="/your-account"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <DropdownItem>Your Account</DropdownItem>
                  </Link>
                  <Link
                    to="/change-password"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <DropdownItem>Change password</DropdownItem>
                  </Link>
                  <Link
                    to="/delete-account"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <DropdownItem>Delete account</DropdownItem>
                  </Link>
                  <DropdownItem onClick={handleLogout}>
                    Logout
                    <LogoutIcon fontSize="" />
                  </DropdownItem>
                </DropdownMenu>
              )}
            </div>
          )}
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
