import styled from "styled-components";
import ButtonStyled from "../../Components/Common/ButtonStyled";
import Description from "../../Components/Common/Description";
import CardContainer from "../../Components/Common/CardContainer";
import Title from "../../Components/Common/Title";
import BackButton from "../../Components/Common/BackButton";
import { useNavigate } from "react-router-dom";

const ContentGrid = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-around;
  background: white;
  border-radius: 2rem;
  border: 1px solid #e5e7eb;
  margin-bottom: 1rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  padding: 1rem;
`;

const UserProfile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const UserImage = styled.img`
  border-radius: 9999px;
  width: 128px;
  height: 128px;
  object-fit: cover;
`;

const ImageGallery = styled.div`
  display: flex;
  gap: 1rem;
  overflow-x: scroll;
`;

const GalleryImage = styled.img`
  border-radius: 1rem;
  width: 100px;
  height: 100px;
  object-fit: cover;
`;

const UploadSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  border: 2px solid #fd7e14; /* border-orange-500 */
`;

const UploadImage = styled.img`
  border-radius: 1rem;
  width: 150px;
  height: 150px;
  object-fit: cover;
`;

const UploadButtonSection = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

export default function Component() {
  const navigate = useNavigate();
  const goto = (where) => {
    navigate(where);
  };
  return (
    <CardContainer maxWidth="32rem">
      <BackButton onClick={() => goto(-1)}>{"<"}</BackButton>
      <Title>MyPage</Title>

      <ContentGrid>
        <UserProfile>
          <UserImage alt="유저 프로필 이미지" src="/likelion.png" />
        </UserProfile>
        <div>
          <p>Welcome, user...</p>
          <ButtonStyled type="button">프로필 메시지 변경</ButtonStyled>
        </div>
      </ContentGrid>

      <p>현재 저장된 이미지 목록들</p>
      <ImageGallery>
        {/* 이미지 추가하도록 수정 필요! 그냥 이미지 안에 추가하면 계속 생겨남 */}
        <GalleryImage alt="유저 업로드 이미지" src="/likelion.png" />
      </ImageGallery>
      <UploadSection>
        <UploadImage
          alt="업로드한 이미지가 여기에 넣어지게 수정 필요"
          src="/likelion.png"
        />
        <UploadButtonSection>
          <ButtonStyled type="button">이미지 업로드</ButtonStyled>
          <ButtonStyled type="button">이미지 저장</ButtonStyled>
        </UploadButtonSection>
        <Description>새로운 이미지를 업로드하고 저장해보세요</Description>
      </UploadSection>
    </CardContainer>
  );
}
