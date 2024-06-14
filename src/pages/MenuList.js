import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { getCategory } from "../api/users";
import MenuItems from "../components/MenuItems";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 60vw;
  margin: 2% auto;
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

//MenuItems를 통해 가져온 메뉴들을 출력하는 부분
//카테고리 필터링은 해당 컴포넌트에서 처리
const MenuList = ({ searchTerm, searchPrice }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("전체");

  //기본은 "전체"로 설정해두고, 카테고리 정보들을 받아옴.
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        //카테고리 정보를 받아옴
        const data = await getCategory();
        //받아온 카테고리 정보에서 카테고리 이름만 추출하여 배열로
        const categoryNames = data.map((category) => category.categoryName);
        //카테고리 상태 업데이트. "전체"를 기본으로 포함
        setCategories(["전체", ...categoryNames]);
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

  //카테고리 별 버튼 클릭이벤트 처리로, 클릭한 카테고리로 selectedCategory를 설정
  const handleButtonClick = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  return (
    //받은 카테고리를 map을 써서 버튼 태그로 모두 나열
    <div>
      <Wrapper>
        <CategoryWrapper>
          {categories.map((categoryName, index) => (
            <Button
              key={index}
              selected={selectedCategory === categoryName}
              onClick={() => handleButtonClick(categoryName)}
            >
              {categoryName}
            </Button>
          ))}
        </CategoryWrapper>

        <div>
          {/* 선택한 카테고리와 App.js에서 넘겨받은 검색어와 가격을 MenuItem에 props로 넘김 */}
          <MenuItems
            selectedCategory={selectedCategory}
            searchTerm={searchTerm}
            searchPrice={searchPrice}
          />
        </div>
      </Wrapper>
    </div>
  );
};

export default MenuList;
