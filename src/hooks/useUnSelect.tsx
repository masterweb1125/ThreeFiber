import useStore from "../store"

const useUnSelect = () => {
    const objectArray = useStore((state: any) => state.objectArray)
    const updateObjectByIndex = useStore((state: any) => state.updateObjectByIndex)
    const updateFocusLine = useStore( (state: any) => state.updateFocusLine )
    const textArray = useStore((state: any) => state.textArray)
    const updateTextByIndex = useStore((state: any) => state.updateTextByIndex)

    const unSelectAll = () => {
        /** Unselect selected components */
        objectArray.forEach((item: any, index: number) => {
            if( item.selected ) {
                const newObject = { ...item }
                newObject.selected = false
                updateObjectByIndex({ index: index, object: newObject })
            }
        })

        /** Unselect selected line */
        updateFocusLine(null)

        /** Unselect Text components */
        textArray.forEach((item: any, index: number) => {
            if( item.selected ) {
                const newObject = { ...item }
                newObject.selected = false
                updateTextByIndex({ index: index, object: newObject })
            }
        })
    }

    return { unSelectAll }
}

export default useUnSelect