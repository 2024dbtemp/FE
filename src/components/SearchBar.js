import React, { useState } from "react";
import styled from "styled-components";
import searchpng from "../assets/search.png";

const Container = styled.div`
  max-width: 60vw;
  margin: 0 auto;
`;

const SearchWrapper = styled.div`
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
  cursor: pointer;
`;

const PriceWrapper = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: right;
  gap: 1rem;
`;

const PriceInput = styled.input`
  border: 1.5px solid #004098;
  padding: 5px;
  font-size: 0.9rem;
  &:focus {
    outline: none;
  }
`;

const PriceButton = styled.button`
  border: none;
  background-color: #004098;
  color: white;
  font-weight: 600;
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
`;

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchPrice, setSearchPrice] = useState({ min: null, max: null });

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = () => {
    const intMin =
      searchPrice.min !== null ? parseInt(searchPrice.min, 10) : null;
    const intMax =
      searchPrice.max !== null ? parseInt(searchPrice.max, 10) : null;
    onSearch(searchTerm, { min: intMin, max: intMax });
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    const intValue = value === "" ? null : parseInt(value, 10);
    setSearchPrice((prevPrice) => ({
      ...prevPrice,
      [name]: intValue,
    }));
  };

  return (
    <Container>
      <SearchWrapper>
        <Search
          type="text"
          placeholder="검색어를 입력해주세요"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button alt="검색" src={searchpng} onClick={handleSearch} />
      </SearchWrapper>
      <PriceWrapper>
        <PriceInput
          type="number"
          placeholder="최소 가격"
          name="min"
          value={searchPrice.min !== null ? searchPrice.min : ""}
          onChange={handlePriceChange}
        />
        <PriceInput
          type="number"
          placeholder="최대 가격"
          name="max"
          value={searchPrice.max !== null ? searchPrice.max : ""}
          onChange={handlePriceChange}
        />
        <PriceButton onClick={handleSearch}>검색</PriceButton>
      </PriceWrapper>
    </Container>
  );
};

export default SearchBar;
