import { useDrag } from "@use-gesture/react";
import * as THREE from 'three'
import useStore from '../../../store';
import { gridProps } from '../../../constants/scene';
import { Billboard, Box, Edges, Image, Line, Text } from '@react-three/drei';
import { Select } from '@react-three/postprocessing'
import lineIcon from '../../../assets/icons/line.png'
import arrowLineIcon from '../../../assets/icons/arrow.png'
import textIcon from '../../../assets/icons/text.png'
import useUnSelect from "../../../hooks/useUnSelect";
import { defaultColors } from "../../../constants";
import { useMemo } from "react";
import AreaPointSphere from "./AreaPointSphere";
import AreaLine from "./AreaLine";

export const DraggableObject = (props: any) => {
    const { unSelectAll } = useUnSelect()

    const { object, floorPlane } = props

    const dragInfo = useStore((state: any) => state.dragInfo)
    const setDragInfo = useStore((state: any) => state.setDragInfo)

    const objectArray = useStore((state: any) => state.objectArray)
    const updateObjectByIndex = useStore((state: any) => state.updateObjectByIndex)

    const focusObject = useStore((state: any) => state.focusObject)

    const lineArray = useStore( (state: any) => state.lineArray )
    const updateLineArray = useStore( (state: any) => state.updateLineArray )
    const updateLineByIndex = useStore( (state: any) => state.updateLineByIndex )

    const isHover = focusObject && focusObject.id === object.id

    const updateModalInfo = useStore( (state: any) => state.updateModalInfo )

    const isPreviewMode = useStore( (state: any) => state.isPreviewMode )

    const isSelected = () => {
        return object.selected
    }

    let planeIntersectPoint = new THREE.Vector3()

    const currentObjectindex = objectArray.findIndex((item: any) => (
        item.id === object.id
    ))

    const bind = useDrag(
        ({ active, movement: [x, y], timeStamp, event }: any) => {
            if( isPreviewMode ) return

            event.stopPropagation()

            if (active && dragInfo.type === 'object') {
                document.body.style.cursor = 'grabbing'

                event.ray.intersectPlane(floorPlane, planeIntersectPoint)

                const newPos = {
                    x: event.altKey ? Math.round(planeIntersectPoint.x) : planeIntersectPoint.x,
                    y: object.pos[1],
                    z: event.altKey ? Math.round(planeIntersectPoint.z) : planeIntersectPoint.z
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
                    x: newPos.x - object.pos[0],
                    y: newPos.y - object.pos[1],
                    z: newPos.z - object.pos[2],
                }

                if( object.selected ) {
                    objectArray.forEach((item: any) => {
                        if( !item.selected )    return

                        const itemPos = item.pos

                        const temp = {
                            x: itemPos[0] + offset.x,
                            y: itemPos[1] + offset.y,
                            z: itemPos[2] + offset.z,
                        }

                        const diff = {
                            x: 0,
                            z: 0
                        }

                        if( temp.x > (gridProps.size / 2 - 0.5) ){
                            diff.x = temp.x - (gridProps.size / 2 - 0.5)
                        }

                        if( temp.x < (-gridProps.size / 2 + 0.5) ) {
                            diff.x = temp.x - (-gridProps.size / 2 + 0.5)
                        }

                        if( temp.z > (gridProps.size / 2 - 0.5) ) {
                            diff.z = temp.z - (gridProps.size / 2 - 0.5)
                        }

                        if( temp.z < (-gridProps.size / 2 + 0.5) ) {
                            diff.z = temp.z - (-gridProps.size / 2 + 0.5)
                        }

                        offset.x -= diff.x
                        offset.z -= diff.z
                    })

                    objectArray.forEach((item: any, index: number) => {
                        if( !item.selected )  return
    
                        const newItem = { ...item }
                        newItem.pos = [
                            newItem.pos[0] + offset.x,
                            newItem.pos[1] + offset.y,
                            newItem.pos[2] + offset.z,
                        ]

                        updateObjectByIndex({ object: newItem, index: index})
                    })
                } else {
                    const newItem = { ...object }

                    newItem.pos = [
                        object.pos[0] + offset.x,
                        object.pos[1] + offset.y,
                        object.pos[2] + offset.z,
                    ]

                    updateObjectByIndex({ object: newItem, index: currentObjectindex })
                }
            } else {
                document.body.style.cursor = 'grab'
            }
        
            setDragInfo({
                isDragging: active,
                type: active ? (dragInfo.type === 'line' ? 'line' : 'object') : null
            })
        
            return timeStamp
        },
        { delay: false }
    );

    const setPointerCursor = (e: any) => {
        document.body.style.cursor = 'pointer'
        e.stopPropagation()
    }

    const onPointerOverHandler = (e: any) => {
        e.stopPropagation()
        document.body.style.cursor = 'grab'
    }

    const onPointerOutHandler = () => {
        document.body.style.cursor = ''
    }

    const onClickHandler = (e: any) => {
        e.stopPropagation()

        if( isPreviewMode ) return

        if( dragInfo.isDragging && dragInfo.type === 'line' ) {
            let newLineArray = [...lineArray]
            const currentLine = { ...newLineArray.at(-1) }
            const currentLinePoints = [ ...currentLine.points ]
            currentLinePoints.splice( currentLinePoints.length - 1, 1 )
            currentLinePoints.push({
                parent: {
                    id: object.id
                },
                pos: object.pos
            })

            currentLine.points = currentLinePoints
            currentLine.type = 'solid'

            updateLineByIndex({line: currentLine, index: newLineArray.length - 1})

            /**
             * End line connecting
             */
             setDragInfo({
                isDragging: false,
                type: null
            })
        } else {
            if( !e.shiftKey ) {
                unSelectAll()
            }

            const objectIndex = objectArray.findIndex((item: any) => (
                item.id === object.id
            ))

            const newObject = { ...object }
            newObject.selected = e.shiftKey ? !newObject.selected : true

            updateObjectByIndex({ index: objectIndex, object: newObject })
        }
    }

    const onClickLineBtn = (event: any, isArrow: boolean) => {
        setDragInfo({
            isDragging: true,
            type: 'line'
        })

        const newInfo = {} as any
        newInfo.isArrow = isArrow
        newInfo.points = []
        const initInfo = {
            pos: object.pos,
            parent: {
                id: object.id
            }
        }
        newInfo.points.push(initInfo)
        newInfo.points.push({
            pos: object.pos
        })
        newInfo.color = defaultColors[2].colorHex
        
        const newLineArray = [...lineArray]
        newLineArray.push( newInfo )
        updateLineArray(newLineArray)

        event.stopPropagation()
    }

    const onClickTextButton = ( event: any ) => {
        updateModalInfo({
            show: true,
            pos: object.pos
        })

        event.stopPropagation()
    }

    const getWireframeObject = () => {
        const geometry = new THREE.EdgesGeometry( object.scene.geometry )
        const material = new THREE.LineBasicMaterial({ color: 0xff0000, linewidth: 1 })
        const wireframe = new THREE.LineSegments( geometry, material )
        wireframe.applyMatrix4( object.scene.matrixWorld )
        wireframe.uuid = object.scene.uuid + 'child'

        return wireframe
    }

    const convexGeo = useMemo(() => {
        if( !object.points )    return

        const shape = new THREE.Shape()

        const verticles = object.points.map((point: any) => new THREE.Vector3(point[0], point[1], point[2]))
        shape.moveTo( verticles[0].x, verticles[0].z )

        for( let i = 1; i < verticles.length; i++ )
            shape.lineTo( verticles[i].x, verticles[i].z )

        shape.lineTo( verticles[0].x, verticles[0].z )

        return new THREE.ShapeGeometry( shape )
    }, [object])

    return (
        <>
            <mesh
                position={object.pos}
                {  ...bind() as any} 
                onPointerOver={ onPointerOverHandler } 
                onPointerOut={ onPointerOutHandler }
                onClick={ onClickHandler }
            >
                { object.type === 'area' ? (
                    <mesh geometry={convexGeo} dispose={null} rotation={[Math.PI / 2, 0, 0]}>
                        <meshStandardMaterial attach="material" color={ object.color } side={ THREE.DoubleSide } />
                    </mesh>
                ) : (
                    <mesh>
                        <primitive object={ object.scene } />
                    </mesh>
                ) }

                {/* <mesh>
                    <primitive object={ getWireframeObject() } />
                </mesh> */}

                { (isHover || isSelected()) && !isPreviewMode ? (
                    <Billboard
                        follow={true}
                        lockX={false}
                        lockY={false}
                        lockZ={false}
                    >
                        <Text 
                            fillOpacity={ !dragInfo.isDragging ? 1 : 0 }
                            color={0xff40aa}
                            anchorX="center" 
                            anchorY="middle" 
                            fontSize={0.5} 
                            position={[0, 1.5, 0]}
                        >
                            { object.name }
                        </Text>

                        <Image 
                            url={textIcon} 
                            opacity={ !dragInfo.isDragging ? 1 : 0 } 
                            transparent 
                            scale={0.3} 
                            position={[1.1, 0.85, 0]}
                            onPointerOver={setPointerCursor}
                            onClick={ (e: any) => onClickTextButton(e) }
                        />

                        <Image 
                            url={arrowLineIcon} 
                            opacity={ !dragInfo.isDragging ? 1 : 0 } 
                            transparent 
                            scale={0.3} 
                            position={[1.1, 0.5, 0]}
                            onPointerOver={setPointerCursor}
                            onClick={ (e: any) => onClickLineBtn(e, true) }
                        />
                        <Image 
                            url={lineIcon} 
                            opacity={ !dragInfo.isDragging ? 1 : 0 } 
                            transparent 
                            scale={0.3} 
                            position={[1.1, 0.15, 0]}
                            onPointerOver={setPointerCursor}
                            onClick={ (e: any) => onClickLineBtn(e, false) }
                        />
                    </Billboard>
                ) : null }
            </mesh>

            { object.type === 'area' ? (
                <mesh
                    position={object.pos}
                >
                    { object.selected ? object.points.map((point: any, index: number) => (
                        <AreaPointSphere 
                            key={`areapointkey${index}`}
                            point={ point }
                            pointIndex={ index }
                            objectIndex={ currentObjectindex }
                            object={ object }
                        />
                    )) : null }

                    { !isPreviewMode ? 
                        <AreaLine object={ object } objectIndex={ currentObjectindex } />
                     : null }
                    
                </mesh>
            ) : null }
        </>
    )
}

export default DraggableObject