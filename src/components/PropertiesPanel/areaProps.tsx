import { RadioGroup } from "@headlessui/react"
import { useState } from "react"
import { defaultColors } from "../../constants"
import useStore from "../../store"

export const AreaProperties = () => {
    const objectArray = useStore((state: any) => state.objectArray)
    const updateObjectByIndex = useStore((state: any) => state.updateObjectByIndex)

    const getActiveArea = () => {
        const index = objectArray.findIndex((item: any) => item.selected && item.type === 'area')
        return objectArray[index]
    }

    const getCurrentColor = () => {
        const index = defaultColors.findIndex((color: any) => color.colorHex === getActiveArea().color )
        return defaultColors[ index ]
    }

    const [color, setColor] = useState( getCurrentColor() ) as any

    const propsPanelInfo = useStore((state: any) => state.propsPanelInfo)
    const updatePropsPanelInfo = useStore((state: any) => state.updatePropsPanelInfo)

    const setBackColor = ( value: any ) => {
        setColor( value )
    }

    const onClose = () => {
        const newInfo = { ...propsPanelInfo }
        newInfo.show = false

        updatePropsPanelInfo( newInfo )
    }

    const onConfirm = () => {
        const newArea = { ...getActiveArea() }
        newArea.color = color.colorHex
        const index = objectArray.findIndex((item: any) => item.selected && item.type === 'area')

        updateObjectByIndex({ object: newArea, index: index })

        onClose()
    }

    return (
        <>
            <div>
                <RadioGroup className="ml-8 mt-8" onChange={setBackColor} value={ color }>
                    <RadioGroup.Label className={"block text-sm font-medium text-gray-700 font-bold"}>
                        Choose a Area Color
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

export default AreaProperties