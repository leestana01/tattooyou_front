import React, { useState } from 'react';
import Webcam from 'react-webcam';
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

const WebcamContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  height: 384px;
  border: 1px solid white;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
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

//카메라 위에 뜰 이미지 컴포넌트 추가함
const StyledImg = styled.img`
  position: absolute;
  width: 96px;
  height: 96px;
  object-fit: cover;
  border-radius: 4px;
  z-index: 1;
  transform: translate(${({ imgPos }) => imgPos.x}px, ${({ imgPos }) => imgPos.y}px);
`;

export default function Component() {
  const [dragging, setDragging] = useState(false);
  const [imgPos, setImgPos] = useState({ x: 16, y: 16 });

  const handleMouseDown = (e) => {
    setDragging(true);
  };

  const handleMouseMove = (e) => {
    if (dragging && e.clientX && e.clientY) {
      const boundingRect = e.target.getBoundingClientRect();
      const newX = e.clientX - boundingRect.left - 96 / 2;
      const newY = e.clientY - boundingRect.top - 96 / 2;

      setImgPos({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  return (
    <Section>
      <WebcamContainer
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <Webcam
          screenshotFormat="image/jpeg"
          style={{ width: '100%', height: '100%', position: 'absolute' }}
        />
        <StyledImg
          alt="AR Tattoo"
          draggable="true"
          src="/likelion.png"
          style={{ aspectRatio: '100/100', objectFit: 'cover' }}
          imgPos={imgPos}
        />
      </WebcamContainer>
      <ScrollableImageList aria-label="Scrollable Image List">
        <ImageGroup>
          <img src="/likelion.png" alt="Image 1" />
          <img src="/likelion.png" alt="Image 2" />
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
