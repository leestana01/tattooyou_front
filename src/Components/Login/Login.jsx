import styled from 'styled-components';
import ButtonStyled from '../Common/ButtonStyled';
import InputStyled from '../Common/InputStyled';

const Card = styled.div`
  padding: 2rem;
  max-width: 20rem;
  width: 100%;
  background: white;
  border-radius: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
`;

const Title = styled.h1`
  text-align: center;
  color: #ff7700;
  margin-bottom: 1.25rem;
`;

const LabelStyled = styled.label`
  color: #ff7700;
`;

const Text = styled.p`
  color: #ff7700;
  text-align: center;
`;

const Form = styled.form`
  display:flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: ${(props) => (props.marginBottom ? props.marginBottom : '10px')};
`

const Login = () => {
  return (
    <Card>
      <Title>AR 타투</Title>
      <Form>
        <LabelStyled htmlFor="email">이메일</LabelStyled>
        <InputStyled id="email" placeholder="m@example.com" required type="email" />
      </Form>
      <Form marginBottom="30px">
        <LabelStyled htmlFor="password">비밀번호</LabelStyled>
        <InputStyled id="password" required type="password" />
      </Form>
      <Form marginBottom="30px">
        <ButtonStyled type="submit">로그인</ButtonStyled>
      </Form>
      <Form marginBottom="20px">
        <Text>또는 게스트로 계속하기</Text>
        <ButtonStyled variant="outline">게스트 로그인</ButtonStyled>
      </Form>
      <div>
        <Text>처음 방문하셨나요?</Text>
        <ButtonStyled variant="outline">회원가입</ButtonStyled>
      </div>
    </Card>
  );
}

export default Login;