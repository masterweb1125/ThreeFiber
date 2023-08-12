import React, { useState, useEffect } from 'react'
import { Check, ChevronDown, Edit, Edit2, Menu, UserCheck } from 'react-feather'
import styled from 'styled-components'

const InputDropDown = styled.div`
    background: #ffffff;
    z-index: 10;
    transition: all 1s !important;
    height: 41px;
    
    font-family: 'Inter';
    font-size: 14px;
    line-height: 17px;
    font-weight: 400;
    color: #344054;

    &.active {
        .dropList {
            display: block;
        }
    }

    .dropList {
        top: 41px;
        display: none;
        border-radius: 2px;
        border: 1px solid #c5c6c8;
        background: white;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }

    .titleInput {
        border-color: #123;
        border-bottom-width: 1px;

        &:focus {
            border-color: #3299ff;
        }
    }
`;

const MenuItem = styled.div`
    padding: 6px 2px;
    border-top: 1px solid hsla(0,0%,100%,.1);
    cursor: pointer;
    transition: all .3s ease;

    &.placeholder {
        color: #c3c3c3;
    }
`

export default function DropDownButton({ term, search, items }: any) {
    const [ show, setShow ] = useState(false)
    const [ isEditMode, setIsEditMode ] = useState(false)
    const [ currentText, setCurrentText ] = useState('Diagram / WebAPP Architeture')
    
    const detectTarget = (event : any) => {
        if( !event.target.matches('#sortButton') ) {
            setShow(false)
        }
    }

    useEffect(() => {
        window.addEventListener('click', detectTarget)

        return () => {
            window.removeEventListener('click', detectTarget)
        }
    })

    const handleShow = () => {
        setShow(prev => !prev)
    }

    const toggleEditMode = () => setIsEditMode(prev => !prev)

    return (
        <InputDropDown className={`flex flex-col justify-start items-center rounded relative ${ show ? 'active' : '' }`}>
            { !isEditMode ? (
                <div className='flex items-center justify-center'>
                    <div id="sortButton" className='cursor-pointer w-full' onClick={ handleShow }>
                        <div className='flex justify-between items-center p-2 pointer-events-none'>
                            <div className='ml-2 mr-4'>
                                Diagram / WebAPP Architeture
                            </div>
                            
                            <ChevronDown size={25} color={'#a1a1a1'}/>
                        </div>
                    </div>
                
                    <button onClick={() => toggleEditMode()}>
                        <Edit2 className='ml-2' size={20} color={'#a1a1a1'}/>
                    </button>
                </div>
            ) : (
                <div className='relative flex items-center justify-center h-full px-4'>
                    <input type={'text'} value={ currentText } className='outline-none border-b py-1 titleInput' />

                    <button onClick={() => toggleEditMode()}>
                        <Check className='ml-2' size={20} color={'#5C426C'}/>
                    </button>

                    <button className='ml-2' onClick={() => toggleEditMode()}>
                        Cancel
                    </button>
                </div>
            ) }
            
            <div className={`flex flex-col justify-center items-center w-full px-4 absolute t-0 dropList`}>
                <MenuItem className='flex justify-start items-center w-full italic placeholder'>Select</MenuItem>
                {/* <MenuItem className='flex justify-start items-center w-full'>Interest</MenuItem>
                <MenuItem className='flex justify-start items-center w-full'>Fee</MenuItem>
                <MenuItem className='flex justify-start items-center w-full'>MIMs Left</MenuItem> */}
            </div>
        </InputDropDown>
    )
}
