import { useState, useEffect } from "react";
import styled from "styled-components";
import CardContainer from "../../Components/Common/CardContainer";
import BackButton from "../../Components/Common/BackButton";
import Title from "../../Components/Common/Title";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Section = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem; // gap-4
`;

const PostContainer = styled.div`
  border-radius: 0.5rem; // rounded-lg
  overflow: hidden;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05); // shadow-lg
`;

const PostImage = styled.img`
  width: 100%; // w-full
  height: 10rem; // h-64
  object-fit: cover;
`;

const PostContent = styled.div`
  padding: 1rem; // p-4
`;

const PostTitle = styled.h3`
  font-size: 1.125rem; // text-lg
  font-weight: bold; // font-bold
  margin-bottom: 0.5rem; // mb-2
  color: #f97316; // text-orange-600
`;

const PostDetail = styled.p`
  color: #4b5563; // text-gray-700
`;

const LikesButton = styled.button`
  color: #f97316; // text-orange-600
  border: 1px solid #f97316; // border-orange-600
  &:hover {
    background-color: #f97316; // bg-orange-600
    color: white; // text-white
  }
`;

const LikesContainer = styled.div`
  display: flex;
  flex-directio: row;
  justify-content: space-between;
  margin-top: 1rem;
`;

export default function Component() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER}/users/posts`);
        const formattedPosts = response.data.map(post => ({
          ...post,
          image: `data:image/jpeg;base64,${post.image}`,
          likes: Math.floor(Math.random() * 200) // 각 게시물에 대해 랜덤한 좋아요 수 부여
        }));
        setPosts(formattedPosts);
      } catch (error) {
        console.error("게시물을 불러오는 데 실패했습니다.", error);
      }
    };

    fetchPosts();
  }, []);

  const goto = (where) => {
    navigate(where);
  };
  return (
    <CardContainer maxWidth="32rem">
      <BackButton onClick={() => goto(-1)}>{"<"}</BackButton>
      <Title>Contest</Title>

      <Section>
        {posts.map((post, index) => (
          <PostContainer key={index}>
            <PostImage
              alt={`Post ${index}`}
              src={post.image}
              style={{
                aspectRatio: "500/500",
                objectFit: "cover",
              }}
            />
            <PostContent>
              <PostTitle>{post.title}</PostTitle>
              <PostDetail>작성자 : {post.username}</PostDetail>
              <LikesContainer>
                <LikesButton variant="outline">Like</LikesButton>
                <PostDetail>Likes: {post.likes * 100}</PostDetail>
              </LikesContainer>
            </PostContent>
          </PostContainer>
        ))}
      </Section>
    </CardContainer>
  );
}
