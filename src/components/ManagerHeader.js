import React from "react";
import styled from "styled-components";

const Container = styled.div`
  max-width: 60vw;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

const Wrapper = styled.ManagerHeader`
  height: 80px;
  width: 100%;
  border-bottom: 1px solid #004098;
`;

const Logo = styled.div`
  font-size: 2.3rem;
  color: #004098;
  font-weight: 800;
`;

const Menu = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const MenuItem = styled.li`
  font-size: 1rem;
  font-weight: 600;
  display: inline;
  margin-left: 10px;
  cursor: pointer;
`;
const SearchWrapper = styled.div`
  max-width: 60vw;
  margin: 0 auto;
  margin-top: 20px;
  display: flex;
  align-items: center;
`;

const Search = styled.input`
  border: 1.5px solid #004098;
  width: 100%;
  height: 40px;
  padding: 5px;
  font-size: 0.9rem;
  &:focus {
    outline: none;
  }
`;

const Button = styled.img`
  width: 40px;
  height: 40px;
  display: block;
  margin-left: 10px;
`;

const ManagerHeader = () => {
  const navigate = useNavigate();

  const logoutUser = () => {
    localStorage.removeItem("authToken");
    alert("로그아웃이 완료되었습니다.");
    navigate("/login");
  };
  return (
    <div>
      <Wrapper>
        <Container>
          <Logo>C-ON</Logo>
          <Menu>
            <MenuItem>메뉴 관리</MenuItem>
            <MenuItem>카테고리 관리</MenuItem>
            <MenuItem onClick={logoutUser}>로그아웃</MenuItem>
          </Menu>
        </Container>
      </Wrapper>
      <SearchWrapper>
        <Search type="text" placeholder="검색어를 입력해주세요" />
        <Button alt="검색" src={searchpng} />
      </SearchWrapper>
    </div>
  );
};

export default ManagerHeader;
