import { useState } from "react";
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
  const [logindata, setLoginData] = useState({
    username: '',
    password: ''
  });

  const handleChange = e => {
    setLoginData({
      ...logindata,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault();

    axios.post(`${process.env.REACT_APP_SERVER}/users/login`, logindata)
    .then(response => {
      console.log(response.data.id);
      localStorage.setItem("user",response.data.id);
      navigate("menus");
    })
    .catch(error => {
      alert('아이디 혹은 비밀번호가 틀렸습니다.')
    })
  }

  const loginAsGuest = e => {
    localStorage.setItem("user","guest");
    navigate("menus");
  }

  const navigate = useNavigate();
  const goto = (where) => {
    navigate(where);
  };


  return (
    <CardContainer>
      <Title>AR 타투</Title>
      <Form onSubmit={handleSubmit}>
        <LabelStyled htmlFor="email">이메일</LabelStyled>
        <InputStyled
          id="email"
          name="userId"
          value={logindata.userId}
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
          value={logindata.password} 
          required type="password" 
          onChange={handleChange}
        />
        <SpaceArea></SpaceArea>
        <ButtonStyled type="submit">
          로그인
        </ButtonStyled>
      </Form>
      <SpaceArea></SpaceArea>
      <Form marginBottom="20px">
        <Text>또는 게스트로 계속하기</Text>
        <ButtonStyled variant="outline" onClick={() => {loginAsGuest()}}>게스트 로그인</ButtonStyled>
      </Form>
      <div>
        <Text>처음 방문하셨나요?</Text>
        <ButtonStyled variant="outline">회원가입</ButtonStyled>
      </div>
    </CardContainer>
  );
}
