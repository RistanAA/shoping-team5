import styled from "styled-components";
import Layout from "../components/Layout";

const First = () => {
    return (
      <Layout>
        <Container>
            <Orderbtn>
            </Orderbtn>
        </Container>
      </Layout>
    );
  };
  
  export default First;
  
  const Container = styled.div`
    display: flex;
    justify-content: space-between;
    background-image:
  `;

  const Orderbtn= styled.div`
  height: 40px;
  width: 120px;
  background-color: #fff;
  border-radius: 12px;
  cursor: pointer;
`;