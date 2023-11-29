import React, { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import styled from 'styled-components';
import html2canvas from 'html2canvas';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
  background: gray;
`;

const ImageGroup = styled.div`
  display: flex;
  gap: 16px;
  height: 100px;
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
`;

export default function Component() {
  const [dragging, setDragging] = useState(false);
  const [imgPos, setImgPos] = useState({ x: 16, y: 16 });
  const [imgRotation, setImgRotation] = useState(0); //StyledImg 회전을 위해
  const [imgScale, setImgScale] = useState(1); //이미지 확대를 위해 추가
  const [imageList, setImageList] = useState([]); // 백엔드에서 가져온 이미지 목록을 저장
  const [styledImgSrc, setStyledImgSrc] = useState("/likelion.png");
  const webcamRef = useRef(null);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER}/users/images/3`);
        const formattedImages = response.data.map(image => `data:image/jpeg;base64,${image}`);
        setImageList(formattedImages);
        if (response.data.length > 0) {
          setStyledImgSrc(formattedImages[0]);
        }
      } catch (error) {
        console.error("이미지를 불러오는 데 실패했습니다.", error);
      }
    };

    fetchImages();
  }, []);

  // 이미지를 클릭했을 때 StyledImg의 src를 업데이트하는 함수
  const handleImageClick = (base64Image) => {
    setStyledImgSrc(base64Image);
  };

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

  const handleScreenshot = async () => {
    const webcamContainer = document.getElementById('webcam-container');

    if (webcamContainer) {
      const canvas = await html2canvas(webcamContainer);
      const screenshotUrl = canvas.toDataURL('image/png');

      //촬영한 사진을 localStorage에 저장
      localStorage.setItem('screenshotUrl', screenshotUrl);

      //cameraphoto로 넘어간다
      navigate('/cameraphoto');
    }
  };

  const handleRotateCounterClockwise = () => {
    //반시계 회전 버튼 클릭 시 왼쪽으로 10도씩 기울임
    setImgRotation(imgRotation - 10);
  };

  const handleRotateClockwise = () => {
    //시계 회전 버튼 클릭 시 오른쪽으로 10도씩 기울임
    setImgRotation(imgRotation + 10);
  };

  const handleZoomIn = () => {
    //도안 확대 클릭 시 이미지가 1.2배씩 확대
    const newScale = Math.min(imgScale * 1.2, 2.0736); //최대 4번(1.2배를 4번)까지 이미지 확대 가능
    setImgScale(newScale);
  };

  const handleZoomOut = () => {
    //도안 축소 클릭 시 이미지가 0.8배씩 축소
    const newScale = Math.max(imgScale * 0.8, 0.4096);
    setImgScale(newScale);
  };

  return (
    <Section>
      <WebcamContainer
        id="webcam-container"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          style={{ width: '100%', height: '100%', position: 'absolute' }}
        />
        <StyledImg
          alt="AR Tattoo"
          draggable="false" //이미지 드래그 기능 비활성화(처음에는. 클릭 시에만 드래그되도록 함)
          src={styledImgSrc}
          style={{
            aspectRatio: '100/100',
            objectFit: 'cover',
            transform: `translate(${imgPos.x}px, ${imgPos.y}px) rotate(${imgRotation}deg) scale(${imgScale})`,
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        />
      </WebcamContainer>
      <ScrollableImageList aria-label="Scrollable Image List">
      <ImageGroup>
          {imageList.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Image ${index + 1}`}
              onClick={() => handleImageClick(image)}
            />
          ))}
        </ImageGroup>
      </ScrollableImageList>

      <ActionButtons>
        <RotateButton variant="outline" onClick={handleRotateCounterClockwise}>반시계 회전</RotateButton>
        <RotateButton variant="outline" onClick={handleRotateClockwise}>시계 회전</RotateButton>
        <RotateButton variant="outline" onClick={handleZoomIn}>도안 확대</RotateButton>
        <RotateButton variant="outline" onClick={handleZoomOut}>도안 축소</RotateButton>
      </ActionButtons>
      <RoundButton variant="outline" onClick={handleScreenshot}></RoundButton>
    </Section>
  );
}