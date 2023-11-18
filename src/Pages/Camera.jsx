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
    if (e.target.tagName.toLowerCase() === 'img') {
      setDragging(true);
    }
  };

  const handleMouseMove = (e) => {
    if (dragging && e.clientX && e.clientY) {
      //boundingRect를 사용하여 현재 마우스 커서의 좌표를 WebcamContainer 엘리먼트 내부 좌표계로 변환하고, 그에 따라 이미지의 위치를 조정
      const boundingRect = e.currentTarget.getBoundingClientRect();
      //마우스 이벤트 객체에서, 현재 마우스 커서의 x 및 y 좌표
      //현재 마우스 커서의 위치를 WebcamContainer 내부 좌표계로 변환한 후, 이미지의 크기에 따라 보정을 가해준다.

      //마우스 커서 위치에서 이미지의 중심을 빼서 이미지의 좌표를 조정
      const imageWidth = 96; // 이미지의 실제 너비
      const imageHeight = 96; // 이미지의 실제 높이

      const newX = e.clientX - boundingRect.left - imageWidth * 2;
      const newY = e.clientY - boundingRect.top - imageHeight * 2;
      //새로 계산된 이미지의 위치를 setImgPos 함수를 사용하여 업데이트 -> React는 상태가 변경되었음을 감지하고 화면을 다시 렌더링
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
          draggable="false" //이미지 드래그 기능 비활성화(처음에는. 클릭 시에만 드래그되도록 함)
          src="/likelion.png"
          style={{ aspectRatio: '100/100', objectFit: 'cover' }}
          imgPos={imgPos}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
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