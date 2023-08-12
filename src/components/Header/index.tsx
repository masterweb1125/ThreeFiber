import styled from 'styled-components'
import { Copy, CornerUpLeft, CornerUpRight, DownloadCloud, Lock, Trash2 } from "react-feather"
import { IconTextPinkButton, InputButton } from "../../theme/components"
import LogoImage from '../../assets/logo.png'
import ProjectNameListBox from '../ProjectNameListBox'
import HeaderButtons from './buttons'
import PopOver from './popover'
import ProfileButton from './profileButton'

const HeaderWrapper = styled.div`
    height: 53px;
    background: #FFFFFF;
    border: 1px solid #E5E5E5;
`

const Title = styled.div`
    font-family: 'Inter';
    line-height: 17px;
    color: #59448f;
`

const Logo = styled.img`
    width: 30px;
    height: 30px;
`

export const Header = () => {
    return (
        <HeaderWrapper className="flex justify-between items-center w-full p-4">
            <div className='flex justify-center items-center'>
                <Logo className='mr-3' src={ LogoImage } alt='pic' />

                <Title className='font-bold text-xl'>Snapano.com</Title>
            </div>

            <div className="flex items-center justify-center">
                <ProjectNameListBox />

                <HeaderButtons />

                <PopOver />
            </div>

            <ProfileButton />
        </HeaderWrapper>
    )
}

export default Header