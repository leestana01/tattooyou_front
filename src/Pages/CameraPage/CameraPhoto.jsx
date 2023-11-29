import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonStyled from "../../Components/Common/ButtonStyled";
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
  text-align: center;
  & > *:not(:last-child) {
    margin-bottom: 20px;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const StyledButton = styled(ButtonStyled)`
  width: 300px;
`;

export const StyledTextArea = styled.textarea`
  background: #e2e8f0;
  border-radius: 9999px;
  padding: 0.5rem 1rem;
  outline: none;
  width: 100%;
  border: none;

  &:focus {
    box-shadow: 0 0 0 2px #f59e0b;
  }
`;

const PostButton = styled.button`
  background-color: ${props => props.isActive ? '#f59e0b' : '#gray'};
  color: white;
  border: none;
  border-radius: 9999px;
  padding: 0.5rem 1rem;
  margin-top: 10px;
  cursor: pointer;
`;

const CameraPhoto = () => {
    const [screenshotUrl, setScreenshotUrl] = useState(null);
    const [showTextarea, setShowTextarea] = useState(false);
    const [textareaContent, setTextareaContent] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        //localStorage에서 screenshotUrl을 읽어온다
        const storedScreenshotUrl = localStorage.getItem('screenshotUrl');
        setScreenshotUrl(storedScreenshotUrl);
    }, []);

    const handlePostClick = () => {
        if (localStorage.getItem("user") == "guest"){
          alert('게스트 사용자는 이용할 수 없습니다.');
          return;
        }
        setShowTextarea(true); //네, 게시할래요 버튼 클릭 시 Textarea 표시
    };

    const handleTextareaChange = (event) => {
        setTextareaContent(event.target.value);
    };

    const handlePostButtonClick = async () => {
      if (!textareaContent.trim()) {
        alert("제목을 입력해주세요");
        return;
      }
    
      try {
        const base64Data = screenshotUrl.split(',')[1];
        const byteCharacters = atob(base64Data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const imageBlob = new Blob([byteArray], { type: 'image/png' });
        const imageFile = new File([imageBlob], "screenshot.png", { type: 'image/png' });
    
        const formData = new FormData();
        formData.append('title', textareaContent);
        formData.append('image', imageFile);
        formData.append('content', textareaContent);
        formData.append('writerId', localStorage.getItem("user"));
    
        // axios POST 요청
        const response = await axios.post(`${process.env.REACT_APP_SERVER}/users/posts`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
    
        // 요청이 성공적으로 완료된 후의 작업
        console.log(response.data);
        alert("게시물이 성공적으로 업로드되었습니다.");
        navigate('/contest');
      } catch (error) {
        console.error("게시물 업로드 실패:", error);
        alert("게시물 업로드에 실패했습니다.");
      }
    };

    const handlePostButtonClick_back = () => {
        navigate('/menus');
    };

    return (
        <Container>
            <h1>TATTOo 콘테스트에 사진을 게시하시겠습니까?</h1>
            {screenshotUrl && (
                <img src={screenshotUrl} alt="Screenshot" style={{ maxWidth: '100%' }} />
            )}
            <ButtonsContainer>
                <StyledButton onClick={handlePostClick}>네, 게시할래요</StyledButton>
                <StyledButton onClick={handlePostButtonClick_back}>아니요, 넘어갈래요</StyledButton>
            </ButtonsContainer>
            {showTextarea && (
                <>
                    <StyledTextArea
                        maxLength="30"
                        placeholder="TATTOo의 제목을 입력하세요..."
                        value={textareaContent}
                        onChange={handleTextareaChange}
                    ></StyledTextArea>
                    <PostButton isActive={textareaContent.length > 0} onClick={handlePostButtonClick}>게시하기</PostButton>
                </>
            )}
        </Container>
    );
};

export default CameraPhoto;
