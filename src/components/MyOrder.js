import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getOrders } from "../api/users"; // API 호출 함수 임포트
import { Link } from "react-router-dom";

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
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const OrderItemDetails = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-right: auto;
  text-decoration: none;
  color: inherit;
`;

const OrderItemName = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
`;

const OrderItemDate = styled.p`
  color: #666;
`;

const OrderItemImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 20px;
`;

const OrderItemPrice = styled.p`
  font-weight: bold;
  text-align: right;
`;

const DateInputWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
`;

const DateInput = styled.input`
  border: 1.5px solid #004098;
  padding: 5px;
  font-size: 0.9rem;
  &:focus {
    outline: none;
  }
  margin-left: 10px;
`;

const MyOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders({ startDate, endDate });
        console.log(data);
        setOrders(data);
      } catch (error) {
        console.error("주문 내역 불러오기 실패", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [startDate, endDate]);

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    if (name === "start") {
      setStartDate(value);
    } else {
      setEndDate(value);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!orders.length) {
    return <div>주문 내역이 없습니다.</div>;
  }

  return (
    <OrderWrapper>
      <OrderTitle>주문 내역</OrderTitle>
      <DateInputWrapper>
        <label>조회 시작일</label>
        <DateInput
          type="date"
          name="start"
          value={startDate}
          onChange={handleDateChange}
        />
        <label>조회 종료일</label>
        <DateInput
          type="date"
          name="end"
          value={endDate}
          onChange={handleDateChange}
        />
      </DateInputWrapper>
      {orders.map((order, index) => (
        <OrderItem key={index}>
          <OrderItemDetails to={`/orders/${order.cartId}`}>
            <OrderItemName>{order.representativeFoodName}</OrderItemName>
            <OrderItemDate>
              {new Date(order.orderDateTime).toLocaleString()}
            </OrderItemDate>
          </OrderItemDetails>
          <OrderItemPrice>{order.totalPrice.toLocaleString()}원</OrderItemPrice>
        </OrderItem>
      ))}
    </OrderWrapper>
  );
};

export default MyOrder;
