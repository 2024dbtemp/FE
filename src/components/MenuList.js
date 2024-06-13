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

const MenuList = ({
  selectedCategory,
  searchTerm,
  searchPrice = { min: "", max: "" },
}) => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMenuItems = async (name, minPrice, maxPrice, category) => {
    setLoading(true);
    try {
      const data = await getFood(name, minPrice, maxPrice, category);
      console.log(data);
      setMenuItems(data);
    } catch (error) {
      console.log("메뉴 출력 실패", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuItems(
      searchTerm,
      searchPrice.min,
      searchPrice.max,
      selectedCategory === "전체" ? [] : [selectedCategory]
    );
  }, [searchTerm, searchPrice.min, searchPrice.max, selectedCategory]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {menuItems.map((item, index) => (
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

export default MenuList;
