import styled from "styled-components";

export default styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  /* background: linear-gradient(to right, #fda085, #f6d365); */
  background: linear-gradient(90deg, #ff7777, #f6d365, #77ff77, #7777ff);
  background-size: 5000px 5000px;
  animation: gradientmoving 24s infinite;

  @keyframes gradientmoving {
    0% {
      background-position: 0% 0%;
    }

    50% {
      background-position: 100% 0%;
    }

    100% {
      background-position: 0% 0%;
    }
  }
`;
