import React from "react";
import styled from "styled-components";

const StyledScreenContainer = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to right, #fda085, #f6d365);
`;

const ScreenContainer = props => {
    return (
        <StyledScreenContainer>{props.element}</StyledScreenContainer>
    );
}

export default ScreenContainer;