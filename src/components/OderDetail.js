import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { getOrderbyId } from "../api/users";

const OrderWrapper = styled.div`
  max-width: 60vw;
  margin: 0 auto;
  padding: 20px;
`;

const OrderTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
  margin-bottom: 10px;
`;

const OrderDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-right: auto;
  border-bottom: 1px solid #004098;
`;

const OrderDate = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
`;

const OrderItemName = styled.p`
  font-size: 1rem;
  font-weight: bold;
`;

const OrderItemDate = styled.p`
  color: #666;
`;

const OrderItemQuantity = styled.p`
  font-size: 1rem;
`;

const OrderItemPrice = styled.p`
  font-size: 1rem;
`;

const OrderItemTotalPrice = styled.p`
  font-weight: bold;
  text-align: right;
`;

const OrderDetailTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: bold;
  margin: 20px 0 10px 0;
`;

const OrderSummary = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 20px;
`;

const OrderDetail = () => {
  const { cartId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const data = await getOrderbyId(cartId);
        setOrderDetails(data);
        console.log(data);
      } catch (error) {
        console.error("주문 상세 정보 불러오기 실패", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [cartId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!orderDetails) {
    return <div>주문 상세 정보가 없습니다.</div>;
  }

  return (
    <OrderWrapper>
      <OrderDetailTitle>주문 상세</OrderDetailTitle>
      <OrderDetailsWrapper>
        <OrderDate>
          {orderDetails.orderDateTime
            ? new Date(orderDetails.orderDateTime).toLocaleDateString() +
              " 주문"
            : "날짜 정보 없음"}
        </OrderDate>
        <OrderItemName>
          {orderDetails.representativeFoodName} 외{" "}
          {orderDetails.totalFoodCount - 1}개
        </OrderItemName>
        <OrderItemDate>
          주문 일시:{" "}
          {orderDetails.orderDateTime
            ? new Date(orderDetails.orderDateTime).toLocaleString()
            : "날짜 정보 없음"}
        </OrderItemDate>
        <OrderItemTotalPrice>
          총 결제 금액:{" "}
          {orderDetails.totalPrice
            ? orderDetails.totalPrice.toLocaleString() + "원"
            : "가격 정보 없음"}
        </OrderItemTotalPrice>
      </OrderDetailsWrapper>
      {orderDetails.orderFoodResponses &&
        orderDetails.orderFoodResponses.map((food, index) => (
          <OrderItem key={index}>
            <OrderItemName>{food.name}</OrderItemName>
            <OrderItemQuantity>{food.quantity}개</OrderItemQuantity>
            <OrderItemPrice>
              단일 메뉴 가격:{" "}
              {food.price ? food.price.toLocaleString() + "원" : "정보 없음"}
            </OrderItemPrice>
            <OrderItemTotalPrice>
              {food.price && food.quantity
                ? (food.price * food.quantity).toLocaleString() + "원"
                : "가격 정보 없음"}
            </OrderItemTotalPrice>
          </OrderItem>
        ))}
      <OrderSummary>
        <div>총 {orderDetails.totalFoodCount}개</div>
        <div>
          전체 총 금액:{" "}
          {orderDetails.totalPrice
            ? orderDetails.totalPrice.toLocaleString() + "원"
            : "가격 정보 없음"}
        </div>
      </OrderSummary>
    </OrderWrapper>
  );
};

export default OrderDetail;
