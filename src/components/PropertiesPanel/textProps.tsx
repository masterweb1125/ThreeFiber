import { RadioGroup } from "@headlessui/react"
import { useState } from "react"
import { defaultColors } from "../../constants"
import useStore from "../../store"

export const TextProperties = () => {
    const textArray = useStore((state: any) => state.textArray)
    const updateTextByIndex = useStore((state: any) => state.updateTextByIndex)

    const getActiveText = () => {
        const index = textArray.findIndex((text: any) => text.selected)
        return textArray[index]
    }

    const getCurrentColor = () => {
        const index = defaultColors.findIndex((color: any) => color.colorHex === getActiveText().color )
        return defaultColors[ index ]
    }

    const [color, setColor] = useState( getCurrentColor() ) as any
    const [textStyle, setTextStyle] = useState( getActiveText().standUp ? 'standup' : 'default') as any

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
        const newText = { ...getActiveText() }
        newText.standUp = textStyle === 'standup'
        newText.color = color.colorHex
        const index = textArray.findIndex((text: any) => text.selected)

        updateTextByIndex({ object: newText, index: index })

        onClose()
    }

    return (
        <>
            <div>
                <RadioGroup className="ml-8 mt-8" onChange={setBackColor} value={ color }>
                    <RadioGroup.Label className={"block text-sm font-medium text-gray-700 font-bold"}>
                        Choose a Text Color
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

                <RadioGroup className="ml-8 mt-8" onChange={ (value: any) => setTextStyle(value) } value={ textStyle }>
                    <RadioGroup.Label className={"block text-sm font-medium text-gray-700 font-bold"}>
                        Choose a Text Style
                    </RadioGroup.Label>

                    <div className="flex justify-start items-center py-4">
                        <RadioGroup.Option value={'default'} >
                            {({ checked, active }) => (
                                <div className="flex items-center justify-center cursor-pointer">
                                    <div className={`${ checked ? 'ring ring-4 ring-purple-500' : 'ring ring-4 ring-gray-300' } ring-purple-500 relative rounded-full flex items-center justify-center cursor-pointer focus:outline-none`}>
                                        <RadioGroup.Label as="p" className={'sr-only'}>
                                            { 'Default' }
                                        </RadioGroup.Label>

                                        <span aria-hidden="true" className={`h-3 w-3 border border-black border-opacity-10 rounded-full`}></span>
                                    </div>

                                    <div className="ml-2">{ 'Default' }</div>
                               </div>
                            )}
                        </RadioGroup.Option>

                        <RadioGroup.Option value={'standup'} >
                            {({ checked, active }) => (
                                <div className="flex items-center justify-center mx-8 cursor-pointer">
                                    <div className={`${ checked ? 'ring ring-4 ring-purple-500' : 'ring ring-4 ring-gray-300' } ring-purple-500 relative rounded-full flex items-center justify-center cursor-pointer focus:outline-none`}>
                                        <RadioGroup.Label as="p" className={'sr-only'}>
                                            { 'StandUp' }
                                        </RadioGroup.Label>

                                        <span aria-hidden="true" className={`h-3 w-3 border border-black border-opacity-10 rounded-full`}></span>
                                    </div>

                                    <div className="ml-2">{ 'StandUp' }</div>
                               </div>
                            )}
                        </RadioGroup.Option>
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

export default TextProperties