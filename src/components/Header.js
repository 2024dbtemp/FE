import React, { useState } from "react";
import styled from "styled-components";
import searchpng from "../assets/search.png";
import { Link, Outlet } from "react-router-dom";
import SearchBar from "./SearchBar";

const HeaderContainer = styled.div`
  max-width: 60vw;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

const Wrapper = styled.header`
  height: 80px;
  width: 100%;
  border-bottom: 1px solid #004098;
`;

const Logo = styled(Link)`
  font-size: 2.3rem;
  color: #004098;
  font-weight: 800;
  cursor: pointer;
  text-decoration: none;
`;

const Menu = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const MenuItem = styled(Link)`
  font-size: 1rem;
  font-weight: 600;
  display: inline;
  margin-left: 10px;
  cursor: pointer;
  color: inherit;
  text-decoration: none;
`;

//사용자 모드의 헤더 컴포넌트
const Header = ({ onSearch, showSearchBar }) => {
  //상단바의 로그아웃을 누를 시에 사용자 토큰을 없애 로그아웃 시킴
  const logoutUser = () => {
    localStorage.removeItem("authToken");
    alert("로그아웃이 완료되었습니다.");
  };
  //장바구니, 사용자의 주문내역에 갈 수 있도록 Link를 사용
  return (
    <div>
      <Wrapper>
        <HeaderContainer>
          <Logo to={"/"}>C-ON</Logo>
          <Menu>
            <MenuItem to={"/cart"}>장바구니</MenuItem>
            <MenuItem to={"/myorder"}>마이주문</MenuItem>
            <MenuItem to={"login"} onClick={logoutUser}>
              로그아웃
            </MenuItem>
          </Menu>
        </HeaderContainer>
      </Wrapper>
      {showSearchBar && <SearchBar onSearch={onSearch} />}
      <Outlet />
    </div>
  );
};

export default Header;
