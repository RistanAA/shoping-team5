import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Layout from "../components/Layout";

const First = () => {
    const navigate = useNavigate()
    return (
      <Layout>
        <Container>
            <Orderbtn onClick={()=>navigate("/home")}>"Ini First"
            </Orderbtn>
        </Container>
      </Layout>
    );
  };
  
  export default First;
  
  const Container = styled.div`
    display: flex;
    justify-content: space-between;
    background-image:'https://cdn.wallpapersafari.com/62/14/NxhobW.jpg';
  `;

  const Orderbtn= styled.button`
  display:center;
  height: 40px;
  width: 120px;
  background-color: #fff;
  border-radius: 12px;
  cursor: pointer;
`;