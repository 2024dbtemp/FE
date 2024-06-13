import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { getCategory } from "../api/users";
import MenuList from "./MenuList";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const CategoryWrapper = styled.div`
  margin-bottom: 60px;
`;

const Button = styled.button`
  float: left;
  border: 1px solid #004098;
  border-radius: 30px;
  background-color: white;
  color: #004098;
  font-weight: 600;
  padding: 10px;
  width: 80px;
  font-size: 0.8rem;
  margin-right: 10px;
  cursor: pointer;
  ${({ selected }) =>
    selected &&
    css`
      background-color: #004098;
      border: none;
      color: white;
    `}
  &:hover {
    background-color: #004098;
    border: none;
    color: white;
  }
`;

const Category = ({ searchTerm, searchPrice }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("전체");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategory();
        setCategories(data);
      } catch (error) {
        console.log("카테고리 출력 실패", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleButtonClick = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  return (
    <div>
      <Wrapper>
        <CategoryWrapper>
          <Button
            selected={selectedCategory === "전체"}
            onClick={() => handleButtonClick("전체")}
          >
            전체
          </Button>
          {categories.map((category, index) => (
            <Button
              key={index}
              selected={selectedCategory === category.categoryName}
              onClick={() => handleButtonClick(category.categoryName)}
            >
              {category.categoryName}
            </Button>
          ))}
        </CategoryWrapper>
        <div>
          <MenuList
            selectedCategory={selectedCategory}
            searchTerm={searchTerm}
            searchPrice={searchPrice}
          />
        </div>
      </Wrapper>
    </div>
  );
};

export default Category;
