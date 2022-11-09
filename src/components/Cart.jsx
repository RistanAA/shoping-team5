import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { cancelCart, checkout, __addToCart } from "../redux/modules/items";

const Cart = () => {
  const cartItems = useSelector((state) => state.items.cart);
  // const storeI = useSelector((state) => state.items);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // console.log(cartItems)

  const handleCancel = (id) => {
    dispatch(cancelCart(id))
  }
  // const handleCheckout = () => {
  //   dispatch(checkout())
  //   // console.log(storeI)
  // }
  const handleNavigate = () =>{
    dispatch(__addToCart())
    navigate('/checkout')
  }

  let sum = 0

  return (
    <CartContainer>
      <CartHeader>Cart</CartHeader>
      {cartItems.map((item) => {
        sum+=item.price
        return (
          <CartItem key={item.id}>
            <ItemTitle>{item.title} x {item.qty}</ItemTitle>
            <ItemPrice>Rp. {item.price}</ItemPrice>
            <ItemButton borderColor={"red"} onClick={() => handleCancel(item.id)}>Cancel</ItemButton>
          </CartItem>
        );
      })}
      <h1>Rp {sum}</h1>
      <CartButton disabled={cartItems.length > 0?null:'disabled'} borderColor={"green"} onClick={() => handleNavigate()}>Done</CartButton>
    </CartContainer>
  );
};

export default Cart;

const CartContainer = styled.div`
  border: 1px solid black;
  border-radius: 10px;
  width: 40%;
  height: 500px;
  margin: 10px;
  padding: 10px;
`;

const CartHeader = styled.h3`
  text-align: center;
`;

const CartItem = styled.div`
  border: 1px solid black;
  border-radius: 10px;
  display: flex;
  padding: 5px;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const CartButton = styled.button`
  border: 1px solid ${({ borderColor }) => borderColor};
  height: 40px;
  width: 100%;
  background-color: #fff;
  border-radius: 12px;
  cursor: pointer;
`

const ItemTitle = styled.span`
  text-decoration: none;
`;

const ItemPrice = styled.span`
  font-style: italic;
`;

const ItemButton = styled.button`
  border: 1px solid ${({ borderColor }) => borderColor};
  height: 40px;
  width: 120px;
  background-color: #fff;
  border-radius: 12px;
  cursor: pointer;
`;
