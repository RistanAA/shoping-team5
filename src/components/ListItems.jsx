import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { useState } from "react";
import { addToCart, minusQty, plusQty } from "../redux/modules/items";

const ListItems = () => {
  // const[item,setItem] = useState()
  const storeItems = useSelector((state) => state.items.storeItem);
  const storeI = useSelector((state) => state.items);
  const dispatch = useDispatch()

  const handlePlus = (id) => {
    dispatch(plusQty(id))
  }
  const handleMinus = (id) => {
    dispatch(minusQty(id))
  }

  const handleAdd = (item) => {
    dispatch(addToCart(item))
    console.log(storeI)
  }

  // console.log(storeItems)
  return (
    <ListContainer>
      <ListHeader>Item List</ListHeader>
      {storeItems.map((item) => {
        return (
          <ListItem key={item.id}>
            <ItemTitle>{item.title}</ItemTitle>
            <ItemPrice>Rp. {item.price}</ItemPrice>
            <QtyContainer>
              <QtyButton onClick={()=> handleMinus(item.id)}>-</QtyButton>
              <QtyInput readOnly value={item.qty} />
              <QtyButton onClick={()=> handlePlus(item.id)}>+</QtyButton>
            </QtyContainer>
            <ItemButton borderColor={"blue"} onClick={() => handleAdd(item)} disabled={item.status?null:'disabled'}>Add</ItemButton>
          </ListItem>
        );
      })}
      {/* <ListItem>
        <ItemTitle>Item Title3</ItemTitle>
        <ItemPrice>Rp. tes321331132</ItemPrice>
        <QtyContainer>
          <QtyButton>-</QtyButton>
          <QtyInput />
          <QtyButton>+</QtyButton>
        </QtyContainer>
        <ItemButton borderColor={"blue"}>Add</ItemButton>
      </ListItem> */}
    </ListContainer>
  );
};

const ListContainer = styled.div`
  border: 1px solid black;
  border-radius: 10px;
  width: 40%;
  height: 500px;
  margin: 10px;
  padding: 10px;
  /* display: flex; */
`;

const ListHeader = styled.h3`
  text-align: center;
`;

const ListItem = styled.div`
  border: 1px solid black;
  border-radius: 10px;
  display: flex;
  padding: 5px;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const ItemTitle = styled(Link)`
  text-decoration: none;
  width: 200px;
`;

const ItemPrice = styled.span`
  font-style: italic;
  width: 200px;
`;

const ItemButton = styled.button`
  border: 1px solid ${({ borderColor }) => borderColor};
  height: 40px;
  width: 120px;
  background-color: #fff;
  border-radius: 12px;
  cursor: pointer;
`;

const QtyContainer = styled.div`
  display: flex;
  margin-left: 7px;
`;

const QtyInput = styled.input`
  width: 20%;
`;
const QtyButton = styled.button`
  width: 20%;
`;

export default ListItems;
