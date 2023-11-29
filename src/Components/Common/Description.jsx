import styled from "styled-components"

export default styled.p`
  text-align: right;
  font-weight: bold;
  font-size: ${(props) => (props.size ? props.size : "")};
  color: #fb923c;
  border-top: 2px solid #f97316;
  margin: 0.5rem 0rem 0.5rem 0rem;
  padding-top: 0.5rem;
`;