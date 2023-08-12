import { XCircleOutline } from "@graywolfai/react-heroicons"
import { Settings } from "react-feather"
import styled from "styled-components"
import useStore from "../../store"
import { IconTextPinkButton } from "../../theme/components"
import AreaProperties from "./areaProps"
import BackgroundProperties from "./backgroundProps"
import LineProperties from "./lineProps"
import TextProperties from "./textProps"

const Wrapper = styled.div`
    position: relative;
`

const SettingButton = styled( IconTextPinkButton )`
    padding: .75rem;
    border-radius: 100vw;
`

const Overlay = styled.div`
    opacity: 0;

    &.active {
        opacity: 1;
    }
`

const Panel = styled.div`
    width: 400px;
    right: -400px;
    background: white;

    &.active {
        right: 0;
    }
`

const CloseBtnWrapper = styled.div`
    opacity: 0;

    &.active {
        opacity: 1;
    }
`

export const PropertiesPanel = () => {
    const propsPanelInfo = useStore((state: any) => state.propsPanelInfo)
    const updatePropsPanelInfo = useStore((state: any) => state.updatePropsPanelInfo)

    const objectArray = useStore((state: any) => state.objectArray)
    const textArray = useStore((state: any) => state.textArray)
    const focusLine = useStore((state: any) => state.focusLine)

    const canShow = propsPanelInfo.show

    const onClickSettingButton = () => {
        const newInfo = { ...propsPanelInfo }
        newInfo.show = true

        updatePropsPanelInfo( newInfo )
    }

    const onClose = () => {
        const newInfo = { ...propsPanelInfo }
        newInfo.show = false

        updatePropsPanelInfo( newInfo )
    }

    const PropertiesComponent = () => {
        const selectedTextIndex = textArray.findIndex((item: any) => item.selected)
        const selectedObjectIndex = objectArray.findIndex((item: any) => item.selected && item.type === 'area' )

        return (
            selectedTextIndex !== -1 ? <TextProperties />
                : selectedObjectIndex !== -1 ? <AreaProperties />
                : focusLine ? <LineProperties />
                : <BackgroundProperties />
        )
    }

    return (
        <Wrapper className="mr-4 flex justify-center items-center">
            <div className={`fixed w-screen h-screen inset-0`} style={{ zIndex: canShow ? 50 : -1 }}>
                <Overlay className={`absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity ease-in-out duration-500 w-full h-full transition-all duration-300 ${ canShow ? 'active' : '' }`} onClick={onClose}/>

                <Panel className={`h-full absolute p-4 transition-all duration-300 ${ canShow ? 'active' : '' }`}>
                    <CloseBtnWrapper className={`absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4 transition-all duration-300 ${ canShow ? 'active' : '' }`}>
                        <button
                            type="button"
                            className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                            onClick={onClose}
                        >
                            <span className="sr-only">Close panel</span>
                            <XCircleOutline className="h-7 w-7" aria-hidden="true" />
                        </button>
                    </CloseBtnWrapper>

                    <div className="text-lg font-medium text-gray-900">
                        Properties
                    </div>

                    <div className="flex flex-col justify-between h-full">
                        <PropertiesComponent />
                    </div>
                </Panel>
            </div>

            <SettingButton onClick={ onClickSettingButton }>
                <Settings size={'25'}></Settings>
            </SettingButton>
        </Wrapper>
    )
}