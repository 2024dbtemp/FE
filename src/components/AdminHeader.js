import React, { useState } from "react";
import styled from "styled-components";
import searchpng from "../assets/search.png";
import { Link, Outlet, useNavigate } from "react-router-dom";
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
//관리자 모드의 헤더 컴포넌트
const Header = ({ onSearch, showSearchBar }) => {
  const logoutUser = () => {
    localStorage.removeItem("authToken");
    alert("로그아웃이 완료되었습니다.");
  };
  //상단바의 로그아웃을 누를 시에 사용자 토큰을 없애 로그아웃 시킴
  return (
    //관리자 모드에서 메뉴를 확인할 수 있도록 하고, 기간 별 총 매출액과 ~별 판매량 페이지로 이동할 수 있도록 함
    <div>
      <Wrapper>
        <HeaderContainer>
          <Logo to={"/admin"}>C-ON</Logo>
          <Menu>
            {/* 오빠는 여기 메뉴 없애면 돼 그리고 카테고리판매량이랑 음식판매량 둘 중 하나 선택하고 안 쓸 거는 삭제해 파일 이름 따라가서 삭제하면 돼*/}
            <MenuItem to={"/admin"}>메뉴</MenuItem>
            <MenuItem to={"/admin/sales"}>매출액</MenuItem>
            <MenuItem to={"/admin/sales/category"}>카테고리판매량</MenuItem>
            <MenuItem to={"/admin/sales/food"}>음식판매량</MenuItem>
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
