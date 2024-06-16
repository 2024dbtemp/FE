import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getSalesByFood } from "../api/admin"; // API 호출 함수 임포트

const SalesWrapper = styled.div`
  max-width: 60vw;
  margin: 0 auto;
  padding: 20px;
`;

const SalesTitle = styled.h1`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

const SalesItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const SalesItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-right: auto;
`;

const SalesItemName = styled.p`
  font-size: 1rem;
  font-weight: bold;
`;

const SalesItemRank = styled.p`
  color: #666;
`;

const SalesItemTotalQuantitySold = styled.p`
  font-weight: bold;
  text-align: right;
`;

const SalesByFood = () => {
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);

  // 음식별 판매량을 가져오는 함수
  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        // 음식별 판매량 데이터를 서버에서 가져옴
        const data = await getSalesByFood();
        setSalesData(data);
      } catch (error) {
        console.error("음식별 판매량 불러오기 실패", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSalesData();
  }, []);

  return (
    <SalesWrapper>
      <SalesTitle>음식별 매출액 순위</SalesTitle>
      {loading ? (
        <div>Loading...</div>
      ) : salesData.length === 0 ? (
        <div>결제 내역이 없습니다.</div>
      ) : (
        // 음식별 판매량을 표시
        salesData.map((food, index) => (
          <SalesItem key={index}>
            <SalesItemDetails>
              <SalesItemName>{food.foodName}</SalesItemName>
              <SalesItemRank>순위: {food.rank}</SalesItemRank>
            </SalesItemDetails>
            <SalesItemTotalQuantitySold>
              총 판매량: {food.totalQuantitySold.toLocaleString()}개
            </SalesItemTotalQuantitySold>
          </SalesItem>
        ))
      )}
    </SalesWrapper>
  );
};

export default SalesByFood;
