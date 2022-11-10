import { useNavigate } from "react-router-dom";
import styled from "styled-components";
// import Layout from "../components/Layout";

const First = () => {
    const navigate = useNavigate()
    return (
      // <Layout>
        <Container>
            <Orderbtn onClick={()=>navigate("/home")}>"Ini First"
            </Orderbtn>
        </Container>
      // </Layout>
    );
  };
  
  export default First;
  
  const Container = styled.div`
    align-items: center;
    
    height:80%;
    width:80%;
    background-image: url('https://cdn.wallpapersafari.com/62/14/NxhobW.jpg');
  `;

  const Orderbtn= styled.button`
  marginauto:center;
  height: 40px;
  width: 120px;
  background-color: #fff;
  border-radius: 12px;
  cursor: pointer;
  align-items: center;
`;