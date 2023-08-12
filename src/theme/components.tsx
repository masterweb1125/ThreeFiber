import styled from "styled-components";

export const InputButton = styled.button`
    margin-left: 0.5rem;
    margin-right: 0.5rem;

    :hover {
        cursor: pointer;

        svg {
            stroke: #986db2 !important;
        }
    }

    :disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }
`

export const IconTextPinkButton = styled.button`
    padding: 8px 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #6b45b8;
    color: #F5F5F5;
    border-radius: 5px;

    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;

    :hover {
        cursor: pointer;
        color: #d8d8d8;

        svg {
            stroke: #d8d8d8;
        }
    }

    :disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }
`

export const IconTextNormalButton = styled.button`
    padding: 8px 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #FFFFFF;
    color: #344054;
    border: 1px solid #E5E5E5;
    border-radius: 6px;

    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 109.02%;

    :hover {
        cursor: pointer;
        color: #d8d8d8;

        svg {
            stroke: #d8d8d8;
        }
    }

    :disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }
`