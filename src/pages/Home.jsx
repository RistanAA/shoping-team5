import styled from "styled-components";
import Cart from "../components/Cart";
import CommentList from "../components/commentList";
import Header from "../components/Header";
import Layout from "../components/Layout";
import ListItems from "../components/ListItems";

const Home = () => {
  return (
    <Layout>
      <Header title={'Shopping Cart'}/>
      <ListContainer>
        <ListItems />
        <Cart />
      </ListContainer>
      <CommentList />
    </Layout>
  );
};

export default Home;

const ListContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
