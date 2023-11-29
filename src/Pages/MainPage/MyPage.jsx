import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ButtonStyled from "../../Components/Common/ButtonStyled";
import Description from "../../Components/Common/Description";
import CardContainer from "../../Components/Common/CardContainer";
import Title from "../../Components/Common/Title";
import BackButton from "../../Components/Common/BackButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
  height: 100px;
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
  const [imageList, setImageList] = useState([]); // 백엔드에서 가져온 이미지 목록을 저장
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef();
  const user = localStorage.getItem("user");
  
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER}/users/images/${user}`);
        const formattedImages = response.data.map(image => `data:image/jpeg;base64,${image}`);
        setImageList(formattedImages); // 가공된 이미지 목록으로 업데이트
      } catch (error) {
        console.error("이미지를 불러오는 데 실패했습니다.", error);
      }
    };

    fetchImages();
  }, []);

  const handleImageLoad = () => {
    const file = fileInputRef.current.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageSave = async () => {
    const file = fileInputRef.current.files[0];
    if (!file) {
      alert("이미지를 먼저 선택해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append('id', user);
    formData.append('image', file);

    try {
      await axios.post(`${process.env.REACT_APP_SERVER}/users/images`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then(() => {
        alert("이미지가 성공적으로 업로드되었습니다.");
        window.location.reload();
      })
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
      alert("이미지 업로드에 실패했습니다.");
    }
  };
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
          <p style={{ fontWeight: "bold", marginBottom: "0" }}>어서오세요,,</p>
          <p style={{ fontWeight: "bold", margin: "16px 0" }}>여기서 원하는 이미지를</p>
          <p style={{ fontWeight: "bold" }}>추가할 수 있습니다!</p>
          {/* <ButtonStyled type="button">프로필 메시지 변경</ButtonStyled> */}
        </div>
      </ContentGrid>

      <p>현재 저장된 이미지 목록들</p>
      <ImageGallery>
          {imageList.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Image ${index + 1}`}
            />
          ))}
      </ImageGallery>
      <UploadSection>
        <UploadImage
          alt="불러온 이미지가 여기에 표시됨"
          src={selectedImage || "/preview.png"}
        />
        <input
          type="file"
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={handleImageLoad}
        />
        <UploadButtonSection>
          <ButtonStyled type="button" onClick={() => fileInputRef.current.click()}>이미지 불러오기</ButtonStyled>
          <ButtonStyled type="button" onClick={handleImageSave}>이미지 저장</ButtonStyled>
        </UploadButtonSection>
        <Description>새로운 이미지를 업로드하고 저장해보세요</Description>
      </UploadSection>
    </CardContainer>
  );
}
