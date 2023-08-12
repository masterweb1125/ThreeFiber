import { Line } from "@react-three/drei"
import { useGesture } from "@use-gesture/react"
import { useState } from "react"
import { getFixedFloat } from "../../../helper/math"
import useStore from "../../../store"
import * as THREE from 'three'

export const AreaLine = ({ object, objectIndex }: any) => {
    const [focusePoint, setFocusPoint] = useState() as any

    const setDragInfo = useStore((state: any) => state.setDragInfo)
    const updateObjectByIndex = useStore((state: any) => state.updateObjectByIndex)

    const getIndexOverPoint = ( hoverPoint: any ) => {
        const index = object.points.findIndex((point: any) => (
            getFixedFloat(hoverPoint.x, 1) === getFixedFloat( point[0], 1 )
            && getFixedFloat(hoverPoint.y, 1) === getFixedFloat(point[1], 1)
            && getFixedFloat(hoverPoint.z, 1) === getFixedFloat(point[2], 1)
        ))

        return index
    }

    const isPointbetweenTwoOthers = (pA: any, pB: any, pToCheck: any) => {
        var nvAtoB = new THREE.Vector3();
        nvAtoB.subVectors(pB, pA).normalize();
    
        var nvAtoC = new THREE.Vector3();
        nvAtoC.subVectors(pToCheck, pA).normalize();
    
        var nvBtoC = new THREE.Vector3();
        nvBtoC.subVectors(pToCheck, pB).normalize();
    
        let epsilon = 0.0016;
        let cos90epsi = 1.0 - epsilon;
        return nvAtoB.dot(nvAtoC) > cos90epsi && nvAtoB.dot(nvBtoC) < -cos90epsi;
    }

    const bind = useGesture(
        {
            onHover: (state: any) => {
                const { hovering, event } = state
                event.stopPropagation()

                if( !hovering ) {
                    document.body.style.cursor = 'auto'
                }
            },
            onMove: (state: any) => {
                const { event } = state
                event.stopPropagation()

                document.body.style.cursor = `url('imgs/plus.png') 10 10, pointer`

                const index = getIndexOverPoint( event.pointOnLine )

                if( index !== -1 )
                    document.body.style.cursor = `url('imgs/pinpoint.png') 10 10, pointer`
            },
            onDragStart: (state: any) => {
                setDragInfo({
                    isDragging: true
                })

                const { event } = state
                event.stopPropagation()

                const index = getIndexOverPoint( event.pointOnLine )

                if( index === -1 ) { /** Create new point */
                    let newIndex = -1

                    const pointArray = object.points

                    for( let i = 0; i < pointArray.length; i++ ) {
                        const pointA = new THREE.Vector3( pointArray[i][0], pointArray[i][1], pointArray[i][2] )
                        const pointB = new THREE.Vector3( pointArray[ i + 1 >= pointArray.length ? 0 : i + 1 ][0], pointArray[ i + 1 >= pointArray.length ? 0 : i + 1 ][1], pointArray[ i + 1 >= pointArray.length ? 0 : i + 1 ][2] )
                     
                        const target = new THREE.Vector3( event.pointOnLine.x - object.pos[0], 0, event.pointOnLine.z - object.pos[2] )

                        if( isPointbetweenTwoOthers( pointA, pointB, target ) ) {
                            newIndex = i + 1
                            break
                        }
                    }

                    if( newIndex !== -1 ) {
                        const objectPoints = [ ...object.points ]
                        objectPoints.splice(newIndex, 0, [
                            event.pointOnLine.x - object.pos[0],
                            0,
                            event.pointOnLine.z - object.pos[2],
                        ])

                        const newObject = { ...object }
                        newObject.points = objectPoints

                        updateObjectByIndex( { object: newObject, index: objectIndex } )
                    }

                    setFocusPoint({ index: newIndex })
                } else {
                    setFocusPoint({ index: index })
                }
            },
            onDrag: (state: any) => {
                if( !focusePoint )
                    return

                const { event } = state

                event.stopPropagation()

                const planeIntersectPoint = new THREE.Vector3()
                const floorPlane = new THREE.Plane(new THREE.Vector3(0, 0.001, 0), 0)
                floorPlane.translate(new THREE.Vector3(0, 0.001, 0))
                event.ray.intersectPlane(floorPlane, planeIntersectPoint)

                const objectPoints = [ ...object.points ]

                const currentPoint = {
                    x: event.altKey ? Math.round(planeIntersectPoint.x) : planeIntersectPoint.x,
                    y: 0,
                    z: event.altKey ? Math.round(planeIntersectPoint.z) : planeIntersectPoint.z
                }

                objectPoints[focusePoint.index] = [
                    currentPoint.x - object.pos[0],
                    currentPoint.y,
                    currentPoint.z - object.pos[2]
                ]

                const newObject = { ...object }
                newObject.points = objectPoints
                updateObjectByIndex( { object: newObject, index: objectIndex } )
            },
            onDragEnd: (state: any) => {
                setDragInfo({
                    isDragging: false
                })

                setFocusPoint(null)
            }
        }
    )

    return (
        <Line
            points={[...object.points, object.points[0]]}
            color={ object.selected ? 0xff0000 : 0x000000 }
            lineWidth={1}
            {...bind() as any} 
        />
    )
}

export default AreaLine