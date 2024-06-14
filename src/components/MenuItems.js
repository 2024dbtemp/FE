import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getFood } from "../api/users";

const MenuItem = styled(Link)`
  display: flex;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #004098;
  border-radius: 8px;
  transition: border 0.2s ease 0s;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
`;

const MenuImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  margin: 0.5rem;
  margin-right: 4rem;
`;

const MenuDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-grow: 1;
  justify-content: center;
`;

const MenuName = styled.h4`
  margin: 0 0 10px 0;
`;

const MenuDescription = styled.p`
  margin: 0 0 10px 0;
  color: #666;
`;

const MenuPrice = styled.p`
  margin-top: auto;
  font-weight: bold;
`;

//메뉴를 출력하는 컴포넌트
const MenuItems = ({
  selectedCategory,
  searchTerm,
  searchPrice = { min: "", max: "" },
}) => {
  //메뉴 아이템을 동적으로 관리하기 위함
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  //getFood에 음식 이름, 최소/최대 가격, 카테고리를 파라미터로 보내 필터링된 음식 아이템만을 출력
  //이떄 이 모든 값이 빈 값인 즉, 전체 메뉴가 출력되는 상태가 기본값
  const fetchMenuItems = async (name, minPrice, maxPrice, category) => {
    setLoading(true);
    try {
      //서버에 파라미터를 보낸 후, 정보를 받아옴
      const data = await getFood(name, minPrice, maxPrice, category);
      console.log(data);
      setMenuItems(data);
    } catch (error) {
      console.log("메뉴 출력 실패", error);
    } finally {
      setLoading(false);
    }
  };

  //검색어(검색할 음식명), 최소/최대 가격, 선택한 카테고리명을 동적으로 관리해서 api에 넘기기 위한 부분
  useEffect(() => {
    fetchMenuItems(
      searchTerm,
      searchPrice.min,
      searchPrice.max,
      selectedCategory === "전체" ? undefined : selectedCategory
    );
  }, [searchTerm, searchPrice.min, searchPrice.max, selectedCategory]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    //api로부터 받은 메뉴 아이템들을 map을 통해 각 메뉴의 상세 정보를 출력
    <div>
      {menuItems.map((item, index) => (
        // 해당 부분에서 Link를 써서 단일 메뉴 아이템 하나의 상세 페이지로 이동할 수 있게 함
        <MenuItem key={index} to={`/menu/${encodeURIComponent(item.name)}`}>
          <MenuImage src={item.imageUrl} alt={item.name} />
          <MenuDetails>
            <MenuName>{item.name}</MenuName>
            <MenuDescription>{item.description}</MenuDescription>
            <MenuPrice>{Number(item.price).toLocaleString()}원</MenuPrice>
          </MenuDetails>
        </MenuItem>
      ))}
    </div>
  );
};

export default MenuItems;
