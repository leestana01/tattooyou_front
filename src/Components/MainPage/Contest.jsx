import styled from 'styled-components';
import CardContainer from '../Common/CardContainer';
import BackButton from '../Common/BackButton';
import Title from '../Common/Title';
import { useNavigate } from 'react-router-dom';

// 기타 컴포넌트 스타일 정의
const Section = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem; // gap-4
`;

const PostContainer = styled.div`
  border-radius: 0.5rem; // rounded-lg
  overflow: hidden;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); // shadow-lg
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
`

export default function Component() {
    const navigate = useNavigate();
    const goto = where => {
        navigate(where);
    };
    return (
        <CardContainer maxWidth="32rem">
            <BackButton onClick={() => goto(-1)}>{"<"}</BackButton>
            <Title>Contest</Title>

            <Section>
            {[1, 2, 3, 4].map((post) => (
                <PostContainer key={post}>
                <PostImage
                    alt={`Post ${post}`}
                    src="/likelion.png"
                    style={{
                    aspectRatio: "500/500",
                    objectFit: "cover",
                    }}
                />
                <PostContent>
                    <PostTitle>Title of Post {post}</PostTitle>
                    <PostDetail>Written by Author {post}</PostDetail>
                    <LikesContainer>
                        <LikesButton variant="outline">Like</LikesButton>
                        <PostDetail>Likes: {post * 100}</PostDetail>
                    </LikesContainer>
                </PostContent>
                </PostContainer>
            ))}
            </Section>
        </CardContainer>
    );
}
