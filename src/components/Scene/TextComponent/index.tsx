import { Text } from "@react-three/drei"
import { useDrag } from "@use-gesture/react";
import * as THREE from 'three'
import { gridProps } from "../../../constants/scene";
import useUnSelect from "../../../hooks/useUnSelect";
import useStore from "../../../store";

export const TextComponent = ({ textItem, itemIndex }: any) => {
    const { unSelectAll } = useUnSelect()

    const dragInfo = useStore((state: any) => state.dragInfo)
    const setDragInfo = useStore((state: any) => state.setDragInfo)

    const updateTextByIndex = useStore((state: any) => state.updateTextByIndex)

    const isPreviewMode = useStore((state: any) => state.isPreviewMode)

    const floorPlane = new THREE.Plane(new THREE.Vector3(0, 0.001, 0), 0)
    floorPlane.translate(new THREE.Vector3(0, 0.001, 0))
    let planeIntersectPoint = new THREE.Vector3()

    const bind = useDrag(
        ({ active, movement: [x, y], timeStamp, event }: any) => {
            if( isPreviewMode ) return

            event.stopPropagation()

            if (active && dragInfo.type === 'text') {
                document.body.style.cursor = 'grabbing'

                event.ray.intersectPlane(floorPlane, planeIntersectPoint)

                const newPos = {
                    x: planeIntersectPoint.x,
                    y: textItem.pos[1],
                    z: planeIntersectPoint.z
                }

                if( newPos.x > (gridProps.size / 2 - 0.5) )
                    newPos.x = (gridProps.size / 2 - 0.5)
                if( newPos.x < (-gridProps.size / 2 + 0.5) )
                    newPos.x = (-gridProps.size / 2 + 0.5)

                if( newPos.z > (gridProps.size / 2 - 0.5) )
                    newPos.z = (gridProps.size / 2 - 0.5)
                if( newPos.z < (-gridProps.size / 2 + 0.5) )
                    newPos.z = (-gridProps.size / 2 + 0.5)

                const offset = {
                    x: newPos.x - textItem.pos[0],
                    y: newPos.y - textItem.pos[1],
                    z: newPos.z - textItem.pos[2],
                }

                const newItem = { ...textItem }

                newItem.pos = [
                    textItem.pos[0] + offset.x,
                    textItem.pos[1] + offset.y,
                    textItem.pos[2] + offset.z,
                ]

                updateTextByIndex({ object: newItem, index: itemIndex })

            } else {
                document.body.style.cursor = 'grab'
            }
        
            setDragInfo({
                isDragging: active,
                type: active ? 'text' : null
            })
        
            return timeStamp
        },
        { delay: false }
    );

    const onPointerOverHandler = (e: any) => {
        if( isPreviewMode ) return

        e.stopPropagation()
        document.body.style.cursor = 'grab'
    }

    const onPointerOutHandler = () => {
        if( isPreviewMode ) return

        document.body.style.cursor = ''
    }

    const onClickHandler = (e: any) => {
        if( isPreviewMode ) return

        e.stopPropagation()
        
        unSelectAll()

        const newText = { ...textItem }
        newText.selected = true
        updateTextByIndex({ object: newText, index: itemIndex })
    }

    return (
        <mesh
            { ...bind() as any }
            position={ textItem.pos }
            rotation={[ textItem.standUp ? 0 : -Math.PI/2, 0, 0 ]}
            onPointerOver={ onPointerOverHandler } 
            onPointerOut={ onPointerOutHandler }
            onClick={ onClickHandler }
        >
            <Text 
                fillOpacity={ 1 }
                color={ textItem.color }
                anchorX="center" 
                anchorY="bottom" 
                fontSize={0.5} 
                outlineWidth={ textItem.selected ? 0.02 : 0.02 }
                outlineColor={ textItem.selected ? 0xff0000 : 0x000000 }
            >
                { textItem.text }
            </Text>
        </mesh>
    )
}

export default TextComponent