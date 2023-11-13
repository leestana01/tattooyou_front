import styled from 'styled-components';

const ButtonStyled = styled.button`
  width: 100%;
  background-color: ${(props) => (props.variant === 'outline' ? 'transparent' : '#f59e0b')};
  color: ${(props) => (props.variant === 'outline' ? '#f59e0b' : 'white')};
  border: ${(props) => (props.variant === 'outline' ? '2px solid #f59e0b' : 'none')};
  border-radius: 9999px;
  padding: 0.5rem;
  margin-top: ${(props) => (props.variant === 'outline' ? '0.5rem' : '0')};
`;

export default ButtonStyled;