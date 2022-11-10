import { useState } from "react";
import styled from "styled-components";

const CommentForm = () => {
  const [comment, setComment] = useState("");

  const handleChange = ({ target: { name, value } }) => {
    setComment({...comment, [name]: value})
  };
  return (
    <Container>
      <Text>Name</Text>
      <Input onChange={handleChange}/>
      <Text>Comment</Text>
      <Input onChange={handleChange}/>
    </Container>
  );
};

export default CommentForm;

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
