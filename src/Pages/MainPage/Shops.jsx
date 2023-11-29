import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import CardContainer from '../../Components/Common/CardContainer';
import BackButton from '../../Components/Common/BackButton';
import Title from '../../Components/Common/Title';

const ShopContainer = styled.div`
  padding: 20px;
  border: 1px solid #ddd;
  margin-bottom: 10px;
`;

const ShopTitle = styled.h3`
  margin: 0;
`;

const ShopInfo = styled.p`
  margin: 5px 0;
`;

export default function Component() {
  const [shops, setShops] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER}/shops`)
      .then(response => {
        setShops(response.data);
      })
      .catch(error => {
        console.error('타투 샵 정보를 불러오는 데 실패했습니다:', error);
      });
  }, []);

  const goto = (where) => {
    navigate(where);
  };

  return (
    <CardContainer maxWidth="32rem">
        <BackButton onClick={() => goto(-1)}>{"<"}</BackButton>
        <Title>타투샵 정보</Title>
        {shops.map(shop => (
            <ShopContainer key={shop.name}>
            <ShopTitle>{shop.name}</ShopTitle>
            <ShopInfo>연락처: {shop.callNumber}</ShopInfo>
            <ShopInfo>위치: {shop.location}</ShopInfo>
            </ShopContainer>
        ))}
    </CardContainer>
  );
}
