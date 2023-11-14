import styled from 'styled-components';

export default styled.button`
  width: 100%;
  background-color: ${(props) => (props.variant === 'outline' ? 'transparent' : '#f59e0b')};
  color: ${(props) => (props.variant === 'outline' ? '#f59e0b' : props.color ? props.color : 'white')};
  border: ${(props) => (props.variant === 'outline' ? '2px solid #f59e0b' : 'none')};
  border-radius: 9999px;
  padding: 0.5rem;
  margin-top: ${(props) => (props.variant === 'outline' ? '0.5rem' : '0')};
  &:hover {
    background-color: #f97316;
    color: white;
  }
  transition: background-color 200ms, color 200ms;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
`;