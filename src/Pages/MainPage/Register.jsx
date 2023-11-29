import { useEffect, useState } from "react";
import styled from "styled-components";
import ButtonStyled from "../../Components/Common/ButtonStyled";
import InputStyled from "../../Components/Common/InputStyled";
import CardContainer from "../../Components/Common/CardContainer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Title = styled.h1`
  text-align: center;
  color: #ff7700;
  margin-bottom: 1.25rem;
`;

const LabelStyled = styled.label`
  color: #ff7700;
`;

const SpaceArea = styled.div`
  margin-bottom: 20px;
`;

const Text = styled.p`
  color: #ff7700;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: ${(props) =>
    props.marginBottom ? props.marginBottom : "10px"};
`;

export default function Component() {
  const [registerData, setRegisterData] = useState({
    userId: '',
    password: '',
    username: ''
  });
  
  const navigate = useNavigate();

  const handleChange = e => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = e => {
    e.preventDefault();

    // POST 요청 주소를 회원가입으로 변경
    axios.post(`${process.env.REACT_APP_SERVER}/users/register`, registerData)
    .then(response => {
      console.log('회원가입 성공:', response.data);
      localStorage.setItem("user", response.data.id);
      alert("회원가입이 성공적으로 완료되었습니다.");
      navigate("/menus");
    })
    .catch(error => {
      console.error('회원가입 오류:', error);
      alert('회원가입에 실패했습니다.')
    });
  }



  return (
    <CardContainer>
      <Title>회원가입</Title>
      <Form onSubmit={handleSubmit}>
        <LabelStyled htmlFor="email">이메일</LabelStyled>
        <InputStyled
          id="email"
          name="userId"
          value={registerData.userId}
          placeholder="Likelion@example.com"
          required
          type="email"
          onChange={handleChange} 
        />
        <SpaceArea></SpaceArea>
        <LabelStyled htmlFor="password">비밀번호</LabelStyled>
        <InputStyled 
          id="password" 
          name="password"
          value={registerData.password} 
          required 
          type="password" 
          onChange={handleChange}
        />
        <SpaceArea></SpaceArea>
        <LabelStyled htmlFor="username">닉네임</LabelStyled>
        <InputStyled
          id="username"
          name="username"
          value={registerData.username}
          placeholder="별명"
          required
          onChange={handleChange}
        />
        <SpaceArea></SpaceArea>
        <ButtonStyled type="submit">
          회원가입
        </ButtonStyled>
      </Form>
    </CardContainer>
  );
}
