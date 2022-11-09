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
  border-radius: 12px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  margin: 10px;
`;
