import styled from 'styled-components'

export default styled.div`
  position : relative;
  padding: 2rem;
  max-width: ${(props) => props.maxWidth ? props.maxWidth : "20rem" };
  width: ${(props) => props.width ? props.width : "100%" };
  background: white;
  border-radius: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
`;