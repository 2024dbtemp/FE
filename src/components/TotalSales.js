import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getTotalSales } from "../api/admin";

const Wrapper = styled.div`
  max-width: 60vw;
  margin: 0 auto;
  border-bottom: 1px solid #ddd;
  padding-bottom: 3rem;
`;

const SalesWrapper = styled.div`
  max-width: 60vw;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SalesTitle = styled.h1`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

const DateInputWrapper = styled.div`
  display: flex;
  margin-bottom: 20px;
  gap: 0.5rem;
  margin: auto 0;
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

const Sales = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
`;

const TotalSales = () => {
  const [totalSales, setTotalSales] = useState(null);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // 시작일과 종료일이 변경될 때마다 총 매출량을 가져옴
  useEffect(() => {
    const fetchTotalSales = async () => {
      try {
        // 서버에 시작일과 종료일을 보내 필터링된 총 매출량을 가져옴
        const data = await getTotalSales({ startDate, endDate });
        setTotalSales(data.totalSales);
      } catch (error) {
        console.error("총 매출량 불러오기 실패", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTotalSales();
  }, [startDate, endDate]);

  // 날짜 입력 필드 값이 변경될 때마다 상태 업데이트
  const handleDateChange = (e) => {
    const { name, value } = e.target;
    if (name === "start") {
      setStartDate(value);
    } else {
      setEndDate(value);
    }
  };

  return (
    <Wrapper>
      <SalesTitle>기간별 총 매출액</SalesTitle>
      <SalesWrapper>
        <DateInputWrapper>
          <div>
            <label>조회 시작일</label>
            <DateInput
              type="datetime-local"
              name="start"
              value={startDate}
              onChange={handleDateChange}
            />
          </div>
          <div>
            <label>조회 종료일</label>
            <DateInput
              type="datetime-local"
              name="end"
              value={endDate}
              onChange={handleDateChange}
            />
          </div>
        </DateInputWrapper>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <Sales>
            총 매출액:{" "}
            {totalSales !== null && totalSales !== undefined
              ? `${totalSales.toLocaleString()}원`
              : "0원"}
          </Sales>
        )}
      </SalesWrapper>
    </Wrapper>
  );
};

export default TotalSales;
