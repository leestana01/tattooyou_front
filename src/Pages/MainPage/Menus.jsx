import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ButtonStyled from "../../Components/Common/ButtonStyled";
import Description from "../../Components/Common/Description";
import CardContainer from "../../Components/Common/CardContainer";
import Title from "../../Components/Common/Title";
import BackButton from "../../Components/Common/BackButton";

const ImageGrid = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const RoundImage = styled.img`
  border-radius: full;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  width: "128";
  height: "128";
`;

const InfoBox = styled.div`
  display: flex;
  font-weight: bold;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.5rem;
`;

const OptionsContainer = styled.div`
  padding: 1.5rem;
  background-color: white;
  border-radius: 10px;
  border: 2px solid #f97316;
  margin-top: 15px;
`;

const OptionBox = styled.div`
  flex-direction: column;
  gap: 0.5rem;
`;

export default function Component() {
  const navigate = useNavigate();
  const goto = (where) => {
    navigate(where);
  };
  return (
    <CardContainer width="full" maxWidth="32rem">
      <BackButton onClick={() => goto(-1)}>{"<"}</BackButton>
      <Title>AR Tattoo</Title>
      <ImageGrid>
        <RoundImage alt="Lion Image" src="/likelion.png" />
        <InfoBox>
          <p>Welcome.</p>
          <p>We always TATTOo YOu...</p>
        </InfoBox>
      </ImageGrid>
      <OptionsContainer>
        <OptionBox>
          <ButtonStyled variant="outline" onClick={() => goto("/camera")}>
            Real AR Tattoo
          </ButtonStyled>
          <Description size="13px">
            업로드한 이미지로 실제 AR 타투를 경험해보세요.
          </Description>
        </OptionBox>
        <OptionBox>
          <ButtonStyled variant="outline" onClick={() => goto("/camera")}>
            Fun AR Tattoo
          </ButtonStyled>
          <Description size="13px">
            저희가 준비한 이미지로 AR 타투를 즐겨보세요!
          </Description>
        </OptionBox>
        <OptionBox>
          <ButtonStyled variant="outline" onClick={() => goto("/contest")}>
            Tattoo Contest
          </ButtonStyled>
          <Description size="13px">
            다른 사람들의 AR 타투를 구경해보세요
          </Description>
        </OptionBox>
        <OptionBox>
          <ButtonStyled variant="outline">Contact Tattoo Artist</ButtonStyled>
          <Description size="13px">근처 타투샵을 알고싶나요?</Description>
        </OptionBox>
        <OptionBox>
          <ButtonStyled onClick={() => goto("/mypage")}>MyPage</ButtonStyled>
          <Description size="13px">
            마이페이지에서 이미지를 관리하세요!
          </Description>
        </OptionBox>
      </OptionsContainer>
    </CardContainer>
  );
}
