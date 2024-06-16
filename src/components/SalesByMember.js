import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getSalesPerMember } from "../api/admin"; // API 호출 함수 임포트

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
  border-top: 1px solid #ddd;
  padding: 20px;
  margin-bottom: 10px;
`;

const SalesItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-right: auto;
`;

const SalesItemName = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
`;

const SalesItemCno = styled.p`
  color: #666;
`;

const SalesItemRank = styled.p`
  font-weight: bold;
`;

const SalesItemTotalPayment = styled.p`
  font-weight: bold;
  text-align: right;
`;

const Loading = styled.div`
  text-align: center;
`;

const MemberDetail = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SalesByMember = () => {
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);

  // 멤버별 판매량을 가져오는 함수
  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        // 멤버별 판매량 데이터를 서버에서 가져옴
        const data = await getSalesPerMember();
        setSalesData(data);
      } catch (error) {
        console.error("멤버별 판매량 불러오기 실패", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSalesData();
  }, []);

  return (
    <SalesWrapper>
      <SalesTitle>회원별 결제 총액</SalesTitle>
      {loading ? (
        <Loading>Loading...</Loading>
      ) : salesData.length === 0 ? (
        <Loading>주문 내역이 없습니다.</Loading>
      ) : (
        // 멤버별 판매량을 표시
        salesData.map((member, index) => (
          <SalesItem key={index}>
            <SalesItemDetails>
              <MemberDetail>
                <SalesItemName>{member.name}</SalesItemName>
                <SalesItemCno>{member.cno}</SalesItemCno>
              </MemberDetail>
              <SalesItemRank>순위: {member.rank}</SalesItemRank>
            </SalesItemDetails>
            <SalesItemTotalPayment>
              {member.totalPayment && member.totalPayment > 0
                ? `${member.totalPayment.toLocaleString()}원`
                : "결제 내역이 없습니다."}
            </SalesItemTotalPayment>
          </SalesItem>
        ))
      )}
    </SalesWrapper>
  );
};

export default SalesByMember;
