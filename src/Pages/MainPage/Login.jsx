import styled from "styled-components";
import ButtonStyled from "../../Components/Common/ButtonStyled";
import InputStyled from "../../Components/Common/InputStyled";
import CardContainer from "../../Components/Common/CardContainer";
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
  const navigate = useNavigate();
  const goto = (where) => {
    navigate(where);
  };
  return (
    <CardContainer>
      <Title>AR 타투</Title>
      <Form>
        <LabelStyled htmlFor="email">이메일</LabelStyled>
        <InputStyled
          id="email"
          placeholder="Likelion@example.com"
          required
          type="email"
        />
        {/* </Form>
      <Form marginBottom="30px"> */}
        <SpaceArea></SpaceArea>
        <LabelStyled htmlFor="password">비밀번호</LabelStyled>
        <InputStyled id="password" required type="password" />
        {/* </Form>
      <Form marginBottom="30px"> */}
        <SpaceArea></SpaceArea>
        <ButtonStyled type="submit" onClick={() => goto("/menus")}>
          로그인
        </ButtonStyled>
      </Form>
      <SpaceArea></SpaceArea>
      <Form marginBottom="20px">
        <Text>또는 게스트로 계속하기</Text>
        <ButtonStyled variant="outline">게스트 로그인</ButtonStyled>
      </Form>
      <div>
        <Text>처음 방문하셨나요?</Text>
        <ButtonStyled variant="outline">회원가입</ButtonStyled>
      </div>
    </CardContainer>
  );
}
