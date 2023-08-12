import { ChevronRight, Copy, FilePlus, Link, PlusCircle, Trash2, Lock } from "react-feather"
import styled from "styled-components"
import { IconTextPinkButton, InputButton } from "../../theme/components"

const Wrapper = styled.div`
    height: 66px;
    width: 720px;
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
`

const AddButton = styled( IconTextPinkButton )`
    background: #D9D9D9;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 20px;

    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 20px;
    text-align: center;

    :hover {
        color: #717171;

        svg {
            stroke: #717171;
        }
    }
`

const StepComponent = ({ title } : any) => {
    return (
        <div className="flex flex-col justify-center items-center">
            <span>{title}</span>
            <PlusCircle size={18} />
        </div>
    )
}

export const ArchitecturePanel = () => {
    return (
        <Wrapper className="flex justify-between items-center py-2 px-4">
            <AddButton>
                <FilePlus size={18} color={'#5C426C'} className={'mr-2'} />
                Text Label
            </AddButton>

            <div className="flex items-center justify-center">
                <StepComponent title={'Region'}></StepComponent>
                <ChevronRight size={30} className='mx-2' />
                <StepComponent title={'Zone'}></StepComponent>
                <ChevronRight size={30} className='mx-2' />
                <StepComponent title={'Group'}></StepComponent>
                <ChevronRight size={30} className='mx-2' />
                <StepComponent title={'Sub'}></StepComponent>
            </div>

            <div className='flex items-center justify-center'>
                <InputButton>
                    <Link size={'18'} color={'#5C426C'} />
                </InputButton>

                <InputButton>
                    <Lock size={'18'} color={'#5C426C'} />
                </InputButton>

                <InputButton>
                    <Copy size={'18'} color={'#5C426C'} />
                </InputButton>

                <InputButton>
                    <Trash2 size={'18'} color={'#5C426C'} />
                </InputButton>
            </div>
        </Wrapper>
    )
}