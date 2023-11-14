import styled from 'styled-components';

const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  background-color: black;
  padding: 12px 4px;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  height: 384px;
  border: 1px solid white;
  border-radius: 8px;
  overflow: hidden;
`;

const Placeholder = styled.span`
  width: 100%;
  height: 100%;
  background-color: #e2e8f0;
  border-radius: 4px;
`;

const StyledImg = styled.img`
  position: absolute;
  top: 16px;
  left: 16px;
  width: 96px;
  height: 96px;
  object-fit: cover;
  border-radius: 4px;
`;

const ScrollableImageList = styled.div`
  display: flex;
  overflow-x: scroll;
  margin-top: 32px;
`;

const ImageGroup = styled.div`
  display: flex;
  gap: 16px;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 32px;
`;

const RotateButton = styled.button`
  padding: 10px;
  width: 100px;
  border: 1px solid #ccc;
  background-color: transparent;
  cursor: pointer;
  ${props => props.variant === 'outline' && `
    border-color: #ddd;
    color: white;
  `}
`;

const RoundButton = styled.button`
  height: 56px;
  width: 56px;
  border: 1px solid #ccc;
  border-radius: 9999px;
  border-width: 4px;
`;



export default function Component() {
  return (
    <Section>
      <ImageContainer>
        <Placeholder />
        <StyledImg
          alt="AR Tattoo"
          draggable="true"
          src="/likelion.png"
          style={{ aspectRatio: '100/100', objectFit: 'cover' }}
        />
      </ImageContainer>
      <ScrollableImageList aria-label="Scrollable Image List">
        <ImageGroup>
            <img src="/likelion.png"/>
            <img src="/likelion.png"/>
        </ImageGroup>
      </ScrollableImageList>
      <ActionButtons>
        <RotateButton variant="outline">반시계 회전</RotateButton>
        <RotateButton variant="outline">시계 회전</RotateButton>
      </ActionButtons>
      <RoundButton variant="outline"></RoundButton>
    </Section>
  );
}
