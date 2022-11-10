import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { __getComments } from "../redux/modules/items";

const CommentList = () => {
  const comments = useSelector((state) => state.items.comments);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(__getComments());
  },[]);
  console.log(comments);
  return (
    <Container>
      <Header>Comments</Header>
      {comments.map((item) => {
        return (
          <ItemContainer key={item.id}>
            <h3>{item.name}</h3>
            <span>{item.comment}</span>
          </ItemContainer>
        );
      })}
    </Container>
  );
};

export default CommentList;

const Container = styled.div`
  border: 1px solid black;
  border-radius: 12px;
  padding: 20px;
`;

const Header = styled.h2`
  text-align: center;
  font-size: 20pt;
`;

const ItemContainer = styled.div`
  border: 1px solid black;
  border-radius: 12px;
  padding: 10px;
  margin-top: 10px;
`;
