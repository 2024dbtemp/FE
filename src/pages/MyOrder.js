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

  //시작일과 종료일이 변경될 때마다 주문 내역을 가져옴
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        //서버 시작/종료일을 보내 필터링된 주문내역을 가져옴
        const data = await getOrders({ startDate, endDate });
        setOrders(data);
      } catch (error) {
        console.error("주문 내역 불러오기 실패", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [startDate, endDate]);

  //날짜 입력 필드 값이 변결될 때마다 상태 업데이트
  const handleDateChange = (e) => {
    const { name, value } = e.target;
    if (name === "start") {
      setStartDate(value);
    } else {
      setEndDate(value);
    }
  };

  return (
    <OrderWrapper>
      <OrderTitle>주문 내역</OrderTitle>
      <DateInputWrapper>
        <label>조회 시작일</label>
        <DateInput
          type="datetime-local"
          name="start"
          value={startDate}
          onChange={handleDateChange}
        />
        <label>조회 종료일</label>
        <DateInput
          type="datetime-local"
          name="end"
          value={endDate}
          onChange={handleDateChange}
        />
      </DateInputWrapper>
      {loading ? (
        <div>Loading...</div>
      ) : orders.length === 0 ? (
        <div>주문 내역이 없습니다.</div>
      ) : (
        // 주문내역이 있을 경우 주문 내역을 출력
        orders.map((order, index) => (
          <OrderItem key={index}>
            <OrderItemDetails to={`/orders/${order.cartId}`}>
              <OrderItemName>
                {order.representativeFoodName}{" "}
                {order.totalFoodCount > 1
                  ? "외 " + (order.totalFoodCount - 1)
                  : ""}
              </OrderItemName>
              <OrderItemDate>
                {new Date(order.orderDateTime).toLocaleString()}
              </OrderItemDate>
            </OrderItemDetails>
            <OrderItemPrice>
              {order.totalPrice.toLocaleString()}원
            </OrderItemPrice>
          </OrderItem>
        ))
      )}
    </OrderWrapper>
  );
};

export default MyOrder;
