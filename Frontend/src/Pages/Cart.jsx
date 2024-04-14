import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcements from "../components/Announcements";
import Footer from "../components/Footer";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { userRequest } from "../requestMethod";
import { useNavigate } from "react-router-dom";

const KEY =
  "pk_test_51P3k8ZSIRjlmm6mHtpL2tUlHHvAEhXk1Hy2Zzwcvdt474FJOwvvrYIy0vVzr428DBuWdK1Il84614mYJxoElfATZ00lMxNCHVe";

const Container = styled.div`
  background-color: #f8f8f8;
  min-height: 100vh;
`;

const Wrapper = styled.div`
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 500;
  text-align: center;
  color: #333;
  margin-bottom: 20px;
`;

const Top = styled.div`
  display: flex;
  padding: 20px;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
`;

const TopButton = styled.button`
  padding: 10px 20px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background-color: ${(props) =>
    props.type === "filled" ? "#000" : "transparent"};
  color: ${(props) => (props.type === "filled" ? "#fff" : "#000")};
  transition: all 0.3s ease;
  &:hover {
    background-color: ${(props) => (props.type === "filled" ? "#111" : "#eee")};
    color: ${(props) => (props.type === "filled" ? "#fff" : "#111")};
  }
`;

const TopTexts = styled.span`
  ${mobile({ display: "none" })}
`;

const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;

  ${mobile({ flexDirection: "column" })}
`;

const ProductDetails = styled.div`
  display: flex;
  flex: 2;
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
  object-fit: contain;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.div``;

const ProductID = styled.div``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.div``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;

  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;

  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  height: 1px;
  background-color: #eee;
  border: none;
  margin: 10px 0;
`;

const Summary = styled.div`
  flex: 1;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  height: 100%;
  overflow-y: auto;
`;
const SummaryTitle = styled.h2`
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 20px;
`;

const SummaryItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SummaryItemTexts = styled.span`
  font-size: 16px;
  font-weight: ${(props) => (props.type === "total" ? "600" : "normal")};
`;

const SummaryItemPrice = styled.span`
  font-size: 18px;
  font-weight: ${(props) => (props.type === "total" ? "600" : "normal")};
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #000;
  color: #fff;
  font-weight: 600;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background-color: #111;
  }
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const response = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: cart.total * 100,
        });
        navigate("/success", { stripeData: response.data, products: cart });
      } catch {}
    };
    stripeToken && makeRequest();
  }, [stripeToken, cart.total, navigate]);

  const gotoHome = () => {
    navigate("/");
  };

  return (
    <Container>
      <Announcements />
      <Navbar />
      <Wrapper>
        <Title>Your Bag</Title>
        <Top>
          <TopButton onClick={gotoHome}>Continue Shopping</TopButton>
          <TopTexts>
            <TopText>Shooping Bag(2)</TopText>
            <TopText>Your Wishlist(0)</TopText>
          </TopTexts>
          <TopButton type="filled">ChechOut Now</TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((product) => (
              <>
                <Product key={product._id}>
                  <ProductDetails>
                    <Image src={product.image} />
                    <Details>
                      <ProductName>
                        <b>Product:</b>
                        {product.title}
                      </ProductName>
                      <ProductID>
                        <b>ID:</b>
                        {product._id}
                      </ProductID>
                      <ProductColor color={product.color} />
                      <ProductSize>
                        <b>Size:</b>
                        {product.size}
                      </ProductSize>
                    </Details>
                  </ProductDetails>
                  <PriceDetail>
                    <ProductAmountContainer>
                      <RemoveIcon />
                      <ProductAmount>{product.quantity}</ProductAmount>
                      <AddIcon />
                    </ProductAmountContainer>
                    <ProductPrice>
                      ₹{product.price * product.quantity}
                    </ProductPrice>
                  </PriceDetail>
                </Product>
                <Hr />
              </>
            ))}
          </Info>
          <Summary>
            <SummaryTitle>Order Summary</SummaryTitle>
            <SummaryItem>
              <SummaryItemTexts>Subtotal:</SummaryItemTexts>
              <SummaryItemPrice>₹{cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemTexts>Shipping Charges:</SummaryItemTexts>
              <SummaryItemPrice>₹60</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemTexts>Shipping Discount</SummaryItemTexts>
              <SummaryItemPrice>-₹60</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemTexts>Total</SummaryItemTexts>
              <SummaryItemPrice>₹{cart.total}</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
              name="EazyBuy"
              image=""
              billingAddress
              shippingAddress
              description={`Your total is ₹${cart.total}`}
              amount={cart.total * 100}
              token={onToken}
              stripeKey={KEY}
            >
              <Button>CHECKOUT Now</Button>
            </StripeCheckout>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
