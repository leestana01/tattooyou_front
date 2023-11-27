import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonStyled from "../../Components/Common/ButtonStyled";
import styled from 'styled-components';

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
        setShowTextarea(true); //네, 게시할래요 버튼 클릭 시 Textarea 표시
    };

    const handleTextareaChange = (event) => {
        setTextareaContent(event.target.value);
    };

    const handlePostButtonClick = () => {
        navigate('/contest');
    };

    const handlePostButtonClick_back = () => {
        navigate('/camera');
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
