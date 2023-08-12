import { PencilSolid } from '@graywolfai/react-heroicons'
import { Camera, PenTool } from 'react-feather'
import styled from 'styled-components'
import Header from '../../components/Header'
import Loader from '../../components/Loader'
import AddTextModal from '../../components/Modal/addTextModal'
import { Navigator } from '../../components/Navigator'
import { PropertiesPanel } from '../../components/PropertiesPanel'
import Scene from '../../components/Scene'
import LoadSpline from '../../hooks/loadSpline'
import useStore from '../../store'
import { IconTextPinkButton } from '../../theme/components'

const CanvasWrapper = styled.div`
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
    border: 1px solid #c9ced3;
`

const CameraButton = styled( IconTextPinkButton )`
    position: absolute;
    transform: translate3d(-50%, 0, 0);
    left: 50%;
    top: 10px;
`

const PreviewButton = styled( IconTextPinkButton )`
    position: relative;
`

export const Editor = () => {
    const toggleCameraType = useStore((state: any) => state.toggleCameraType)

    const isLoadingModel = useStore((state: any) => state.isLoadingModel)

    const modalInfo = useStore( (state: any) => state.modalInfo )

    const backColor = useStore((state: any) => state.backColor)

    const isPreviewMode = useStore((state: any) => state.isPreviewMode)
    const updateIsPreviewMode = useStore((state: any) => state.updateIsPreviewMode)

    const onClickPreview = () => {
        updateIsPreviewMode( !isPreviewMode )
    }

    return (
        <div className='overflow-hidden w-screen h-screen flex flex-col'>
            <Header />

            <div className='flex justify-between items-center' style={{ background: backColor, height: 'calc(100% - 53px)' }}>
                { !isPreviewMode ? <Navigator /> : null }

                <div className={`flex flex-col justify-center items-center relative h-full py-6 ${ isPreviewMode ? 'px-10': '' }`} style={{ width: `calc(100% - ${ isPreviewMode ? '0' : '520' }px)` }}>
                    <CanvasWrapper 
                        className='mt-4 w-full h-full relative' 
                    >
                        { isLoadingModel ? (
                            <Loader />
                        ) : (
                            <Scene />
                        ) }

                        <CameraButton onClick={toggleCameraType}>
                            <Camera size={18} className='mr-4' color="#e5e5e5"></Camera>
                            Switch Camera
                        </CameraButton>

                    </CanvasWrapper>

                    <PreviewButton className='mt-2' onClick={ onClickPreview }>
                        { isPreviewMode ? (
                            <>
                                <PencilSolid className="h-5 w-5 mr-2"></PencilSolid>
                                Edit
                            </>
                        ) : (
                            <>                            
                                <Camera size={18} className='mr-4' color="#e5e5e5"></Camera>
                                Preview
                            </>
                        ) }

                    </PreviewButton>
                </div>

                { !isPreviewMode ? <PropertiesPanel /> : null }                
            </div>

            <LoadSpline />

            <AddTextModal modalInfo={ modalInfo } />
        </div>
    )
}

export default Editor