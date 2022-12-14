import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { useState } from "react";
import {
  addToCart,
  plusQty,
  minusQty,
  __getStoreItems,
  __addToCart,
  searchItems,
} from "../redux/modules/items";
import { useEffect, useState } from "react";

const ListItems = () => {
  // const[item,setItem] = useState()
  const storeItems = useSelector((state) => state.items.storeItem);
  const loading = useSelector((state) => state.items.isLoading);

  const [search, setSearch] = useState("");
  const [dataStore, setDataStore] = useState([]);

  // const storeI = useSelector((state) => state.items);
  const dispatch = useDispatch();

  const handlePlus = (id) => {
    dispatch(plusQty(id));
  };
  const handleMinus = (id) => {
    dispatch(minusQty(id));
  };

  const handleAdd = (item) => {
    dispatch(addToCart(item));
    // dispatch(__addToCart(item))
  };
  useEffect(() => {
    dispatch(__getStoreItems());
  }, []);

  const handleChange = ({ target: { value } }) => {
    setSearch(value);
  };

  const handleSearch = (value) => {
    dispatch(__getStoreItems());
    setTimeout(()=>{
      dispatch(searchItems(value))
    },400)
  };
  // const handleSearch = (value, data) => {
  //   let query = value.toLowerCase();
  //   // console.log(query)
  //   // console.log(data)
  //   let filtered = data.filter(
  //     (item) => item.title.toLowerCase().indexOf(query) >= 0
  //   );
  //   setDataStore(filtered);
  //   dispatch(__getStoreItems());
  //   console.log(filtered);
  // };

  // if(loading.isLoading){
  //   console.log('loading...')
  //   return <h1>loading</h1>
  // }else{
  //   console.log('done')
  // }

  // console.log(storeItems)
  return (
    <ListContainer>
      <ListHeader>Item List</ListHeader>
      <SearchContainer>
        <SearchInput
          placeholder="  What do you want?"
          onChange={handleChange}
          value={search}
        />
        <ItemButton onClick={() => handleSearch(search, storeItems)}>
          Search
        </ItemButton>
      </SearchContainer>
      {storeItems.map((item) => {
        console.log(item)
          return (
            <ListItem key={item.id}>
              <TitleContainer>
                <ItemTitle>{item.title}</ItemTitle>
                <ItemCategory>{item.category}</ItemCategory>
              </TitleContainer>
              <ListStock>stock: {item.stock}</ListStock>
              <ItemPrice>Rp. {item.price}</ItemPrice>
              <QtyContainer>
                <QtyButton
                  disabled={item.status && item.stock > 0 ? null : "disabled"}
                  onClick={()=> handleMinus(item.id)}
                >
                  -
                </QtyButton>
                <QtyInput readOnly value={item.qty} />
                <QtyButton
                  disabled={item.status && item.stock > 0 ? null : "disabled"}
                  onClick={() => handlePlus(item.id)}
                >
                  +
                </QtyButton>
              </QtyContainer>
              <ItemButton
                borderColor={"blue"}
                onClick={() => handleAdd(item)}
                disabled={item.status && item.stock > 0 ? null : "disabled"}
              >
                Add
              </ItemButton>
            </ListItem>
          );
      })}
    </ListContainer>
  );
};

const ListContainer = styled.div`
  border: 1px solid black;
  background-color: #607466;
  border-color: #f0f4ef;
  border-radius: 10px;
  width: 40%;
  height: 500px;
  margin: 10px;
  padding: 10px;
  /* display: flex; */
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: space-around;
  border-color: yellow;
`;

const SearchInput = styled.input`
  height: 40px;
  width: 350px;
  border: 1px solid black;
  border-radius: 12px;
  /* margin-left: 20px; */
`;

const ItemCategory = styled.span`
  text-decoration: underline;
  font-style: italic;
  font-size: 14pt;
  color: #f0f4ef;
`;

const ItemTitle = styled(Link)`
  text-decoration: none;
  width: 200px;
  color: #f0f4ef;
  font-style: bold;
`;

const TitleContainer = styled.div`
  /* background-color: red; */
  justify-content: space-around;
  width: 100px;
  display: flex;
  flex-direction: column;
`;

const ListStock = styled.h5`
  text-align: center;
  width: 100px;
  margin-right: 5px;
`;
const ListHeader = styled.h3`
  text-align: center;
  font-size: 20pt;
  color: #f0f4ef;
`;

const ListItem = styled.div`
  border: 1px solid black;
  border-radius: 10px;
  display: flex;
  padding: 5px;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  color: #f0f4ef;
`;



const ItemPrice = styled.span`
  font-style: italic;
  color: #f0f4ef;
  width: 200px;
`;

const ItemButton = styled.button`
  border: 1px solid ${({ borderColor }) => borderColor};
  height: 40px;
  width: 120px;
  background-color: #bfcc94;
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
