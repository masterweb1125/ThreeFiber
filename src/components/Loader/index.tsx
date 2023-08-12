import styled from 'styled-components'
import './index.scss'

const LoaderWrapper = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    transform: translate3d(-50%, -50%, 0);
    left: 50%;
    top: 50%;
    background: #eee;
`

export const Loader = () => {
    return (
        <LoaderWrapper className='flex justify-center items-center'>
            <div className="loader">
                <svg viewBox="0 0 80 80">
                    <circle id="test" cx="40" cy="40" r="32"></circle>
                </svg>
            </div>

            <div className="loader triangle">
                <svg viewBox="0 0 86 80">
                    <polygon points="43 8 79 72 7 72"></polygon>
                </svg>
            </div>

            <div className="loader">
                <svg viewBox="0 0 80 80">
                    <rect x="8" y="8" width="64" height="64"></rect>
                </svg>
            </div>
        </LoaderWrapper>
    )
}

export default Loader