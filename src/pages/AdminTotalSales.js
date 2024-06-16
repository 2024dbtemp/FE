import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getTotalSales } from "../api/admin";

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

const SalesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SalesItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 8px;
`;

const CategoryName = styled.div`
  font-size: 1rem;
  font-weight: bold;
`;

const FoodCount = styled.div`
  font-size: 1rem;
  font-weight: bold;
`;

const AdminTotalSales = () => {
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);

  // 총 매출량을 가져오는 함수
  useEffect(() => {
    const fetchTotalSales = async () => {
      try {
        // 서버에서 전체 매출량 데이터를 가져옴
        const data = await getTotalSales();
        setSalesData(data);
      } catch (error) {
        console.error("총 매출량 불러오기 실패", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTotalSales();
  }, []);

  return (
    <SalesWrapper>
      <SalesTitle>카테고리별 음식 개수</SalesTitle>
      {loading ? (
        <div>Loading...</div>
      ) : salesData.length === 0 ? (
        <div>데이터가 없습니다.</div>
      ) : (
        <SalesList>
          {salesData.map((item, index) => (
            <SalesItem key={index}>
              <CategoryName>{item.categoryName}</CategoryName>
              <FoodCount>{item.foodCount.toLocaleString()}개</FoodCount>
            </SalesItem>
          ))}
        </SalesList>
      )}
    </SalesWrapper>
  );
};

export default AdminTotalSales;
