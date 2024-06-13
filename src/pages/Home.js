import React from "react";
import styled from "styled-components";
import Category from "../components/Category";

const Wrapper = styled.div`
  width: 60vw;
  margin: 2% auto;
`;

const Home = ({ searchTerm, searchPrice }) => {
  return (
    <div>
      <Wrapper>
        <Category searchTerm={searchTerm} searchPrice={searchPrice} />
      </Wrapper>
    </div>
  );
};

export default Home;
