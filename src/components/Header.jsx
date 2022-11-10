import styled from "styled-components";

const Header = ({title}) => {
  return (
    <HeaderContainer>
      <div>{title}</div>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  border: 1px solid black;
  background-color:#607466;
  border-color:#f0f4ef;
  border-radius: 12px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  margin: 10px;
  font-size:50pt;
  color:#f0f4ef;
`;
