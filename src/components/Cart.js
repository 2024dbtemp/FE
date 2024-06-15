import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getCart,
  putCartAmount,
  postCart,
  deleteCart,
  postOrders,
} from "../api/users"; // postOrders 함수 추가
import MenuImg from "../assets/menu_img.png";

const CartWrapper = styled.div`
  max-width: 60vw;
  margin: 0 auto;
  padding: 20px;
`;

const CartTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 10px;
  padding: 0 20px;
`;

const CartItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-right: auto;
`;

const CartItemName = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
`;

const CartItemDescription = styled.p`
  color: #666;
`;

const CartItemPrice = styled.p`
  font-weight: bold;
`;

const CartItemImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 2rem;
`;

const QuantityInput = styled.input`
  width: 50px;
  height: 20px;
  margin-right: 10px;
`;

const UpdateButton = styled.button`
  background-color: #004098;
  color: white;
  font-weight: bold;
  padding: 5px 10px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-left: 10px;
`;

const DeleteButton = styled.button`
  background-color: #004098;
  color: white;
  font-weight: bold;
  padding: 5px 10px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-left: 10px;
`;

const CartSummary = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  font-size: 1.2rem;
  font-weight: bold;
`;

const OrderButton = styled.button`
  width: 100%;
  background-color: #004098;
  color: white;
  font-weight: bold;
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  margin-top: 20px;
  font-size: 1.2rem;
`;

//장바구니 가져오기 & 관리 컴포넌트
const Cart = () => {
  //장바구니 정보를 상태로 관리
  const [cartData, setCartData] = useState(null);
  const [loading, setLoading] = useState(true);

  //서버로부터 장바구니 데이터를 가져옴
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const data = await getCart();
        setCartData(data);
      } catch (error) {
        console.error("장바구니 데이터 불러오기 실패", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartData();
  }, []);

  //사용자가 메뉴의 수량을 변경했을 경우, 이를 서버에 보내기 위해 데이터를 관리하는 부분
  //만약 0 이하의 숫자를 입력했을 경우 alert를 띄움.
  const handleQuantityChange = (index, newQuantity) => {
    if (newQuantity < 1) {
      alert("0개 이상을 담으셔야 합니다");
      return;
    }

    //장바구니 내역에 정보가 추가/변경될 때마다 변경된 데이터를 관리할 수 있도록 하는 함수.
    setCartData((prevCartData) => {
      const newCartData = { ...prevCartData };
      newCartData.cartFoodResponses[index].quantity = newQuantity;
      return newCartData;
    });
  };

  //장바구니에서 변경된 정보들을 서버에 보내는 부분
  //메뉴명과 수량을 서버에 보냄
  const handleUpdateCart = async (index) => {
    //업데이트 할 항목을 cartData에서 가져옴
    const item = cartData.cartFoodResponses[index];
    try {
      const response = await putCartAmount({
        foodName: item.name,
        quantity: item.quantity,
      });
      if (response.status === 200) {
        setCartData((prevCartData) => {
          //기존의 장바구니 데이터를 복사
          const newCartData = { ...prevCartData };
          //항목의 총 가격을 수량과 단가를 곱하여 계산
          newCartData.cartFoodResponses[index].totalPrice =
            newCartData.cartFoodResponses[index].price *
            newCartData.cartFoodResponses[index].quantity;
          //장바구니 전체 총 가격을 다시 계산
          newCartData.totalPrice = newCartData.cartFoodResponses.reduce(
            (sum, item) => sum + item.totalPrice,
            0
          );
          return newCartData;
        });
        alert("장바구니가 업데이트되었습니다.");
      }
    } catch (error) {
      console.error("장바구니 업데이트 실패", error);
    }
  };

  //장바구니에서 사용자가 메뉴를 삭제했을 때, 이를 서버에 보내 장바구니 내역에서 지움
  const handleDeleteCartItem = async (index) => {
    //삭제할 항목을 cartDate에서 가져옴
    const item = cartData.cartFoodResponses[index];
    try {
      //서버에 삭제 요청을 보냄
      const response = await deleteCart(item.name);
      if (response.status === 200) {
        setCartData((prevCartData) => {
          //기존 장바구니 데이터 복사
          const newCartData = { ...prevCartData };
          //지정된 인덱스의 항목을 배열에서 삭제
          newCartData.cartFoodResponses.splice(index, 1);
          //장바구니 총 항목 수를 1 감소시킴
          newCartData.totalFoodCount -= 1;
          //장바구니 전체 총 가격 다시 계산
          newCartData.totalPrice = newCartData.cartFoodResponses.reduce(
            (sum, item) => sum + item.totalPrice,
            0
          );
          return newCartData;
        });
        alert("장바구니에서 삭제되었습니다.");
      }
    } catch (error) {
      console.error("장바구니 항목 삭제 실패", error);
    }
  };

  //주문을 처리하는 함수
  const handleOrder = async () => {
    try {
      //서버에 주문 요청을 보냄
      const response = await postOrders();
      if (response.status === 200) {
        console.log(response.data);
        //서버에 보낸 후 장바구니를 비움
        setCartData(null);
      }
    } catch (error) {
      console.error("주문 실패", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!cartData) {
    return <div>장바구니가 비어있습니다.</div>;
  }

  return (
    //장바구니 정보를 출력하기 위한 부분.
    //map을 써서 장바구니 내의 메뉴를 모두 출력
    <CartWrapper>
      <CartTitle>장바구니</CartTitle>
      {cartData.cartFoodResponses.map((item, index) => (
        <CartItem key={index}>
          <CartItemImage src={MenuImg} alt={item.name} />
          <CartItemDetails>
            <CartItemName>{item.name}</CartItemName>
            <CartItemDescription>{item.description}</CartItemDescription>
            <CartItemPrice>{item.price.toLocaleString()}원</CartItemPrice>
            <div>
              {/* Input 태그를 통해 사용자가 수량을 변경할 수 있도록 함 */}
              <QuantityInput
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) =>
                  handleQuantityChange(index, parseInt(e.target.value, 10))
                }
              />
              <UpdateButton onClick={() => handleUpdateCart(index)}>
                변경
              </UpdateButton>
              <DeleteButton onClick={() => handleDeleteCartItem(index)}>
                삭제
              </DeleteButton>
            </div>
            <p>합계: {item.totalPrice.toLocaleString()}원</p>
          </CartItemDetails>
        </CartItem>
      ))}
      <CartSummary>
        <div>총 {cartData.totalFoodCount}개</div>
        <div>총 금액: {cartData.totalPrice.toLocaleString()}원</div>
      </CartSummary>
      <OrderButton onClick={handleOrder}>주문하기</OrderButton>
    </CartWrapper>
  );
};

export default Cart;
