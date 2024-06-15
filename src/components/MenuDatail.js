import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFoodbyName, postCart } from "../api/users";
import styled from "styled-components";
import MenuImg from "../assets/menu_img.png";

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

//메뉴 상세를 볼 수 있도록 하고 해당 메뉴를 장바구니에 담을 수 있도록 하는 컴포넌트
const MenuDetail = () => {
  //메뉴 목록에서 선택한 메뉴로 이동할 수 있도록 하기 위함
  const { name } = useParams();
  const decodedName = decodeURIComponent(name);
  const [menuItem, setMenuItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  //getFoodByName에 메뉴 목록에서 선택한 음식의 이름을 넣어 음식 정보를 받아옴
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

  //"장바구니 담기" 버튼 클릭 시 클릭이벤트 처리를 해주기 위한 함수
  //postCart에 음식 정보를 넘겨 장바구니에 들어가도록 함
  const handleAddToCart = async () => {
    if (!menuItem) return;
    //장바구니에 추가할 데이터 생성
    const cartData = {
      foodName: menuItem.name,
      quantity: parseInt(quantity, 10),
    };

    try {
      //장바구니 데이터를 서버에 보냄
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
  //api로부터 받은 정보를 가져와 메뉴의 상세 정보들을 나열
  //img 부분은 디자인적 요소를 위해 추가한 부분으로 기본 이미지인 회색 이미지로 대체
  return (
    <MenuDetailWrapper>
      <Header>
        <Title>메뉴 상세</Title>
      </Header>
      <Content>
        <Image src={MenuImg} alt={menuItem.name} />
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
