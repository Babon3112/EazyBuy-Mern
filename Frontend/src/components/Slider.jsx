import React, { useState } from "react";
import styled from "styled-components";
import { sliderItems } from "../data";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 2;
  margin: auto;
  opacity: 0.5;
  cursor: pointer;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${props=>props.slideIndex*-100}vw);
`;

const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: ${(props) => props.bg};
`;

const ImageContainer = styled.div`
  height: 100%;
  flex: 1;
`;

const Image = styled.img`
  height: 100%;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
`;

const Title = styled.h1`
  font-size: 70px;
`;

const Description = styled.p`
  margin: 50px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
`;

const Slider = () => {
  const [SliderIndex, setSliderIndex] = useState(0);

  const handleClicked = (direction) => {
    if (direction === "left") {
      setSliderIndex(SliderIndex > 0 ? SliderIndex - 1 : 4);
    } else {
      setSliderIndex(SliderIndex < 4 ? SliderIndex + 1 : 0);
    }
  };

  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClicked("left")}>
        <ArrowBackIosRoundedIcon />
      </Arrow>
      <Wrapper slideIndex = {SliderIndex}>
        {sliderItems.map((sliderItem) => (
          <Slide bg={sliderItem.bg} key={sliderItem.id}>
            <ImageContainer>
              <Image src={sliderItem.img} />
            </ImageContainer>
            <InfoContainer>
              <Title>{sliderItem.title}</Title>
              <Description>{sliderItem.description}</Description>
              <Button>SHOP NOW</Button>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClicked("right")}>
        <ArrowForwardIosRoundedIcon />
      </Arrow>
    </Container>
  );
};

export default Slider;
