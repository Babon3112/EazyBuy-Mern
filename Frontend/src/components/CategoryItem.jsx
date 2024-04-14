import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";

const Container = styled.div`
  flex: 1;
  margin: 5px;
  height: 70vh;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;

  ${mobile({ height: "20vh" })}
`;
const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  opacity: 0;
  transition: opacity 0.3s ease;
  ${Container}:hover & {
    opacity: 1;
  }
`;
const Title = styled.h1`
  margin-bottom: 20px;
  font-size: 24px;
`;
const Button = styled.button`
  cursor: pointer;
  border: none;
  padding: 10px 20px;
  background-color: #fff;
  color: gray;
  font-weight: 600;
  border-radius: 20px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const CategoryItem = ({ category }) => {
  return (
    <Container>
      <Link to={`/productlist/${category.cat}`}>
        <Image src={category.img} />
        <Info>
          <Title>{category.title}</Title>
          <Button>SHOP NOW</Button>
        </Info>
      </Link>
    </Container>
  );
};

export default CategoryItem;
