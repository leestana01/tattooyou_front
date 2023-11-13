import styled from 'styled-components'

const InputStyled = styled.input`
    background: #e2e8f0;
    border-radius: 9999px;
    padding: 0.5rem 1rem;
    outline: none;
    width: full;
    &:focus {
        ring: 2;
        ring-color: #f59e0b;
    }
`;

export default InputStyled;