import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getCart,
  putCartAmount,
  postCart,
  deleteCart,
  postOrders,
} from "../api/users"; // postOrders 함수 추가

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

const Cart = () => {
  const [cartData, setCartData] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const handleQuantityChange = (index, newQuantity) => {
    if (newQuantity < 1) {
      alert("0개 이상을 담으셔야 합니다");
      return;
    }

    setCartData((prevCartData) => {
      const newCartData = { ...prevCartData };
      newCartData.cartFoodResponses[index].quantity = newQuantity;
      return newCartData;
    });
  };

  const handleUpdateCart = async (index) => {
    const item = cartData.cartFoodResponses[index];
    try {
      const response = await putCartAmount({
        foodName: item.name,
        quantity: item.quantity,
      });
      if (response.status === 200) {
        setCartData((prevCartData) => {
          const newCartData = { ...prevCartData };
          newCartData.cartFoodResponses[index].totalPrice =
            newCartData.cartFoodResponses[index].price *
            newCartData.cartFoodResponses[index].quantity;
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

  const handleDeleteCartItem = async (index) => {
    const item = cartData.cartFoodResponses[index];
    try {
      const response = await deleteCart(item.name);
      if (response.status === 200) {
        setCartData((prevCartData) => {
          const newCartData = { ...prevCartData };
          newCartData.cartFoodResponses.splice(index, 1);
          newCartData.totalFoodCount -= 1;
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

  const handleOrder = async () => {
    try {
      const response = await postOrders();
      if (response.status === 200) {
        console.log(response.data);
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
    <CartWrapper>
      <CartTitle>장바구니</CartTitle>
      {cartData.cartFoodResponses.map((item, index) => (
        <CartItem key={index}>
          <CartItemImage src={item.imageUrl} alt={item.name} />
          <CartItemDetails>
            <CartItemName>{item.name}</CartItemName>
            <CartItemDescription>{item.description}</CartItemDescription>
            <CartItemPrice>{item.price.toLocaleString()}원</CartItemPrice>
            <div>
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
