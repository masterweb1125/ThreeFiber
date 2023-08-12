import { useThree } from "@react-three/fiber"
import { useEffect, useRef } from "react";
import * as THREE from 'three'
import { defaultColors } from "../../constants";
import useStore from '../../store';
import { pauseEvent } from "../../utils/helper";

export const FrameHelper = () => {
    const { raycaster, gl } = useThree()

    const rayCasterRef = useRef() as any
    rayCasterRef.current = raycaster

    const dragInfo = useStore((state: any) => state.dragInfo)
    const dragInfoRef = useRef() as any
    dragInfoRef.current = dragInfo

    const lineArray = useStore( (state: any) => state.lineArray )
    const lineArrayRef = useRef() as any
    lineArrayRef.current = lineArray
    const updateLineArray = useStore( (state: any) => state.updateLineArray )

    const focusLine = useStore((state: any) => state.focusLine)
    const focusLineRef = useRef() as any
    focusLineRef.current = focusLine
    const updateFocusLine = useStore((state: any) => state.updateFocusLine)

    const componentArray = useStore((state: any) => state.componentArray)

    const insertObjectArray = useStore((state: any) => state.insertObjectArray)

    const objectArray = useStore( (state: any) => state.objectArray )
    const objectArrayRef = useRef() as any
    objectArrayRef.current = objectArray
    const updateObjectArray = useStore((state: any) => state.updateObjectArray)

    const isPreviewMode = useStore((state: any) => state.isPreviewMode)

    const movePlane = new THREE.Plane(new THREE.Vector3(0, 0.001, 0), 0)
    movePlane.translate(new THREE.Vector3(0, 0.001, 0))

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        gl.domElement.addEventListener('mousemove', onMouseMoveHandler)
        window.addEventListener('pointerup', onPointerUpHandler)
        window.addEventListener('keydown', onKeyDownHandler)

        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            gl.domElement.removeEventListener('mousemove', onMouseMoveHandler)
            window.removeEventListener('pointerup', onPointerUpHandler)
            window.removeEventListener('keydown', onKeyDownHandler)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onMouseMoveHandler = (event: any) => {
        if( isPreviewMode ) return

        pauseEvent(event)

        const dragInfoCurrent = dragInfoRef.current
        const lineArrayCurrent = lineArrayRef.current
        if( dragInfoCurrent.isDragging && dragInfoCurrent.type === 'line' ) {
            const lastPos = lineArrayCurrent.at(-1).points[0].pos

            const planeIntersectPoint = new THREE.Vector3()
            raycaster.ray.intersectPlane(movePlane, planeIntersectPoint)

            const newPos = [
                planeIntersectPoint.x,
                lastPos[1],
                planeIntersectPoint.z,
            ]

            let newLineArray = [...lineArrayCurrent]
            const currentLine = { ...newLineArray.at(-1) }
            const currentLinePoints = [ ...currentLine.points ]
            currentLinePoints.splice( currentLinePoints.length - 1, 1 )
            currentLinePoints.push({
                pos: newPos
            })

            currentLine.points = [ ...currentLinePoints ]

            newLineArray[ newLineArray.length-1 ] = currentLine

            updateLineArray(newLineArray)
        }
    }

    const isInRect = ( rect: any, point: any ) => {
        if( point.x >= rect.left && point.x <= rect.right && point.y >= rect.top && point.y <= rect.bottom )
            return true
        return false
    }   

    const onPointerUpHandler = ( event: any ) => {
        const dragInfoCurrent = dragInfoRef.current

        const rect = gl.domElement.getBoundingClientRect()
        if( !isInRect( rect, { x: event.pageX, y: event.pageY } ) ) return

        if( dragInfoCurrent.isDragging && dragInfoCurrent.type === 'addSpline' ) {
            const planeIntersectPoint = new THREE.Vector3()
            rayCasterRef.current.ray.intersectPlane(movePlane, planeIntersectPoint)

            // const newPos = [
            //     planeIntersectPoint.x,
            //     0,
            //     planeIntersectPoint.z,
            // ]

            const newPos = [
                0,
                0,
                0,
            ]

            const newObject = { ...componentArray.find((item: any) => item.uuid === dragInfoCurrent.item.uuid) }

            if( dragInfoCurrent.item.type === 'area' ) {
                newObject.id = componentArray[0].scene.clone().uuid
                newObject.points = []
                newObject.points.push([ - 1, 0, - 1 ])
                newObject.points.push([ - 1, 0, 1 ])
                newObject.points.push([ 1, 0, 1 ])
                newObject.points.push([ 1, 0, - 1 ])
                newObject.color = defaultColors[2].colorHex
            } else {
                const tempScene = newObject.scene.clone()

                newObject.scene = tempScene
                newObject.id = newObject.scene.uuid
            }
            
            newObject.pos = [ ...newPos ]

            insertObjectArray( newObject )
        }
    }

    const onKeyDownHandler = (event: any) => {
        if( isPreviewMode ) return

        const focuseLineCurrent = focusLineRef.current
        const lineArrayCurrent = lineArrayRef.current
        const objectArrayCurrent = objectArrayRef.current

        if( document.activeElement === document.body && (event.code === 'Delete' || event.code === 'Backspace') ) {
            if( focuseLineCurrent ) {   // selected line remove
                updateFocusLine(null)

                const newLineArray = [...lineArrayCurrent]
                newLineArray.splice( focuseLineCurrent.index, 1 )
                updateLineArray( newLineArray )
            } else {    // selected object remove
                const newObjectArray = objectArrayCurrent.filter((object: any) => !object.selected)
                for( let i = 0; i < newObjectArray.length; i++ ) {
                    const newScene = newObjectArray[i].scene.clone()

                    newObjectArray[i] = {
                        ...newObjectArray[i],
                        scene: newScene
                    }
                }

                const newLineArray = [] as any
    
                lineArrayCurrent.forEach((line: any) => {
                    const firstParentId = line.points.at(0).parent ? line.points.at(0).parent.id : -1
                    const lastParentId = line.points.at(-1).parent ? line.points.at(-1).parent.id : -1
    
                    const firstParentIndex = newObjectArray.findIndex((object: any) => object.id === firstParentId)
                    const lastParentIndex = newObjectArray.findIndex((object: any) => object.id === lastParentId)
    
                    if( firstParentIndex !== -1 && lastParentIndex !== -1 )
                        newLineArray.push(line)
                })
    
                updateLineArray( newLineArray )
                updateObjectArray(newObjectArray)
            }
        }
    }

    return (
        <mesh></mesh>
    )
}

export default FrameHelper