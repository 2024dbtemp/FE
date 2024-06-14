import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFoodbyName, postCart } from "../api/users";
import styled from "styled-components";

const MenuDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  max-width: 60vw;
  margin: 0 auto;
  height: 100%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 1.2rem;
  font-weight: bold;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
`;

const Image = styled.img`
  width: 22.5rem;
  height: 22.5rem;
  object-fit: cover;
  border-radius: 8px;
  margin: 2rem;
  margin-right: 8rem;
`;

const DetailsWrapper = styled.div`
  flex: 2;
  margin: 2rem;
  display: flex;
  flex-direction: column;
  margin-left: auto;
  justify-content: space-between;
`;

const MenuName = styled.div`
  font-size: 1.3rem;
  font-weight: 600;
  text-align: left;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #666;
  text-align: left;
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 1rem;
  align-items: center;
  justify-content: end;
`;

const PriceQuantityWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Price = styled.p`
  font-size: 1.2rem;
  margin: 0;
  margin-right: 20px;
`;

const Quantity = styled.input`
  width: 50px;
  height: 20px;
  margin-right: 10px;
`;

const Button = styled.button`
  background-color: #004098;
  font-size: 1rem;
  color: white;
  font-weight: bold;
  padding: 10px 2rem;
  border: none;
  border-radius: 20px;
  cursor: pointer;
`;

const MenuDetail = () => {
  const { name } = useParams();
  const decodedName = decodeURIComponent(name);
  const [menuItem, setMenuItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenuItem = async () => {
      try {
        const data = await getFoodbyName(decodedName);
        setMenuItem(data[0]);
      } catch (error) {
        console.log("메뉴 상세 정보 출력 실패", error);
      }
    };

    fetchMenuItem();
  }, [decodedName]);

  const handleAddToCart = async () => {
    if (!menuItem) return;

    const cartData = {
      foodName: menuItem.name,
      quantity: parseInt(quantity, 10),
    };

    try {
      const response = await postCart(cartData);
      if (response.status === 200) {
        alert("장바구니에 담겼습니다.");
      }
    } catch (error) {
      console.error("장바구니 추가 실패", error);
    }
  };

  if (!menuItem) {
    return <div>Loading...</div>;
  }

  return (
    <MenuDetailWrapper>
      <Header>
        <Title>메뉴 상세</Title>
      </Header>
      <Content>
        <Image src={menuItem.imageUrl} alt={menuItem.name} />
        <DetailsWrapper>
          <div>
            <div>
              <MenuName>{menuItem.name}</MenuName>
              <Description>{menuItem.description}</Description>
            </div>
            <PriceQuantityWrapper>
              <Price>
                {menuItem.price
                  ? `${menuItem.price.toLocaleString()}원`
                  : "가격 정보 없음"}
              </Price>
              <Quantity
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </PriceQuantityWrapper>
          </div>
          <ButtonWrapper>
            <Button onClick={() => navigate("/")}>뒤로가기</Button>
            <Button onClick={handleAddToCart}>장바구니 담기</Button>
          </ButtonWrapper>
        </DetailsWrapper>
      </Content>
    </MenuDetailWrapper>
  );
};

export default MenuDetail;
