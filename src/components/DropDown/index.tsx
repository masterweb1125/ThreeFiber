import React, { useState } from 'react'
import { Minus, Plus } from 'react-feather'
import styled from 'styled-components'

const InputDropDown = styled.div`
    background: #ffffff;
    overflow: hidden;
    z-index: 10;
    transition: all 1s !important;
    height: 41px;

    &.active {
        height: auto;
    }
`;

const TabBox = styled.div`
    background: #c5dcfa8c;
    border-radius: 0px;

    font-family: 'Manrope';
    font-style: normal;
    font-weight: 700;
    font-size: 15px;
    line-height: 150%;

    color: #0F56B3;
`

export default function DropDown({ title, children }: any) {
    const [ show, setShow ] = useState(false)

    const handleShow = () => {
        setShow(prev => !prev)
    }

    return (
        <InputDropDown className={`flex flex-col justify-start items-center rounded ${ show ? 'active' : '' } mt-2`}>
            <TabBox className='cursor-pointer w-full' onClick={ handleShow }>
                <div className='flex justify-between items-center p-2 pointer-events-none'>
                    <div className='ml-2 mr-4'>
                        { title }
                    </div>

                    { show ? (
                        <Minus size={17} color={'#1672EC'}/>
                    ) : (
                        <Plus size={17} color={'#1672EC'}/>
                    ) }
                </div>
            </TabBox>
            
            <div className={`w-full px-4 mt-1`}>
                { children }
            </div>
        </InputDropDown>
    )
}
