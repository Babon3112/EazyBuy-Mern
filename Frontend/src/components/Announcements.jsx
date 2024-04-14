import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 40px;
  background-color: #4db6ac;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const Announcements = () => {
  return (
    <Container>
      Exciting Offers Await! Shop Now for Great Savings
    </Container>
  );
};

export default Announcements;
