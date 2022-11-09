import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import Layout from "../components/Layout";
import { refreshCart, __checkout, __getStoreItems } from "../redux/modules/items";

const Checkout = () => {
  const cartItems = useSelector((state) => state.items.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCheckout = () => {
    dispatch(__checkout());
    dispatch(refreshCart());
    setTimeout(() => {
      navigate("/home");
      dispatch(__getStoreItems())
    }, 100);
    // console.log(storeI)
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
        <CartButton borderColor={"green"} onClick={() => handleCheckout()}>
          Checkout
        </CartButton>
      </CheckoutContainer>
    </Layout>
  );
};

export default Checkout;

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
  background-color:#607466;
  border-color:#f0f4ef;
  border-radius: 10px;
  margin: auto;
  width: 50%;
  height: 500px;
  padding: 10px;
`;
const CheckoutHeader = styled.h3`
  text-align: center;
  font-sized:50pt;
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
  font-color:white;
  width: 20%;
`;
