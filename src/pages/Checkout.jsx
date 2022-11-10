import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CommentForm from "../components/commentForm";
import Header from "../components/Header";
import Layout from "../components/Layout";
import {
  refreshCart,
  __addComments,
  __checkout,
  __getComments,
  __getStoreItems,
} from "../redux/modules/items";

const Checkout = () => {
  const cartItems = useSelector((state) => state.items.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCheckout = (comment) => {
    dispatch(__checkout());
    dispatch(refreshCart());
    setTimeout(() => {
      navigate("/home");
      dispatch(__getStoreItems());
      dispatch(__addComments(comment))
      dispatch(__getComments());
    }, 100);
  };

  const [comment, setComment] = useState("");

  const handleChange = ({ target: { name, value } }) => {
    setComment({ ...comment, [name]: value });
  };
  return (
    <Layout>
      <Header title={"Checkout"} />
      <CheckoutContainer>
        <CheckoutHeader>Checkout</CheckoutHeader>
        {cartItems.map((item) => {
          return (
            <CheckoutItem key={item.id}>
              <ItemTitle>
                {item.title} x {item.qty}
              </ItemTitle>
              <ItemPrice>Rp. {item.price}</ItemPrice>
            </CheckoutItem>
          );
        })}
        {/* <CommentForm/> */}
        <Container>
          <Text>Name</Text>
          <Input name="name" onChange={handleChange} />
          <Text>Comment</Text>
          <Input name="comment" onChange={handleChange} />
        </Container>
        <CartButton borderColor={"green"} onClick={() => handleCheckout(comment)}>
          Checkout
        </CartButton>
      </CheckoutContainer>
    </Layout>
  );
};

export default Checkout;

const Container = styled.div`
  border: 1px solid white;
  border-radius: 12px;
  padding: 20px;
  margin-top: 50px;
`;
const Text = styled.h3`
  color: white;
`;

const Input = styled.input`
  height: 40px;
  width: 100%;
  border: 1px solid white;
  border-radius: 12px;
`;

const CartButton = styled.button`
  border: 1px solid ${({ borderColor }) => borderColor};
  height: 40px;
  margin-top: 50px;
  margin-left: 10%;
  width: 80%;
  background-color: #bfcc94;
  border-radius: 12px;
  cursor: pointer;
`;

const CheckoutContainer = styled.div`
  border: 1px solid black;
  background-color: #607466;
  border-color: #f0f4ef;
  border-radius: 10px;
  margin: auto;
  width: 50%;
  /* height: 500px; */
  padding: 10px;
`;
const CheckoutHeader = styled.h3`
  text-align: center;
  font-size: 50pt;
  color: #f0f4ef;
`;

const CheckoutItem = styled.div`
  display: flex;
  padding-top: 20px;
  padding-left: 15%;
  align-items: center;
  margin-bottom: 10px;
  color: #f0f4ef;
`;

const ItemTitle = styled.span`
  text-decoration: none;
  color: #f0f4ef;
  width: 30%;
`;

const ItemPrice = styled.span`
  font-style: italic;
  color: white;
  width: 20%;
`;
