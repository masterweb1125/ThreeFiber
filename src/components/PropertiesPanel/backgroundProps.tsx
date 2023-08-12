import { InformationCircleSolid } from "@graywolfai/react-heroicons"
import { RadioGroup } from "@headlessui/react"
import { useState } from "react"
import { defaultColors } from "../../constants"
import useStore from "../../store"
import { FileUpload } from "./fileUpload"

export const BackgroundProperties = () => {
    const [color, setColor] = useState() as any

    const propsPanelInfo = useStore((state: any) => state.propsPanelInfo)
    const updatePropsPanelInfo = useStore((state: any) => state.updatePropsPanelInfo)

    const updateBackColor = useStore((state: any) => state.updateBackColor)

    const setBackColor = ( value: any ) => {
        setColor( value )
    }

    const onClose = () => {
        const newInfo = { ...propsPanelInfo }
        newInfo.show = false

        updatePropsPanelInfo( newInfo )
    }

    const onConfirm = () => {
        updateBackColor( color.colorRGB )

        onClose()
    }

    return (
        <>
            <div>
                <RadioGroup className="ml-8 mt-8" onChange={setBackColor} value={ color }>
                    <RadioGroup.Label className={"block text-sm font-medium text-gray-700"}>
                        Choose a Background Color
                    </RadioGroup.Label>

                    <div className="flex justify-start items-center py-4">
                        { defaultColors.map((color: any, index: number) => (
                            <RadioGroup.Option
                                key={ color.name + index }
                                value={ color }
                            >
                                {({ checked, active }) => (
                                    <div className={`${ color.selectedColor } ${ active && checked ? 'ring ring-offset-1' : '' } ${ !active && checked ? 'ring-2' : '' } -m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none mx-2`}>
                                        <RadioGroup.Label as="p" className={'sr-only'}>
                                            { color.name }
                                        </RadioGroup.Label>

                                        <span aria-hidden="true" className={`${ color.bgColor } h-8 w-8 border border-black border-opacity-10 rounded-full`}></span>
                                    </div>
                                )}
                            </RadioGroup.Option>
                        )) }
                    </div>
                </RadioGroup>

                <div>
                    <div className={"block text-sm font-medium text-gray-700 ml-8 mt-4 mb-4"}>
                        Upload a Background Picture
                    </div>
                    
                    <FileUpload />
                </div>

                <div className="rounded-md bg-blue-50 p-4 mt-8">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <InformationCircleSolid className="h-5 w-5 text-blue-400" aria-hidden="true" />
                        </div>
                        <div className="ml-3 flex-1 md:flex md:justify-between">
                            <p className="text-sm text-blue-700">
                                You can change the scene background by changing the picture and background
                                color.
                            </p>
                            <p className="mt-3 text-sm md:mt-0 md:ml-6">
                                <span className="whitespace-nowrap font-medium text-blue-700 hover:text-blue-600">Details <span
                                aria-hidden="true">&rarr;</span></span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-shrink-0 justify-end px-4 py-4">
                <button
                    type="button"
                    className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={onClose}
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    className="ml-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={ onConfirm }
                >
                    Confirm
                </button>
            </div>
        </>
    )
}

export default BackgroundProperties