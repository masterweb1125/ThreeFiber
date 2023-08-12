import { Line } from "@react-three/drei"
import useStore from "../../../store"
import * as THREE from 'three'
import { useCallback, useState } from "react"
import { getFixedFloat, isSamePoint } from "../../../helper/math"
import { useGesture } from "@use-gesture/react"
import PointSphere from "./PointSphere"
import useUnSelect from "../../../hooks/useUnSelect"

export const LineComponent = ({ line, index: lineIndex }: any) => {
    const { unSelectAll } = useUnSelect()

    const objectArray = useStore((state: any) => state.objectArray)
    const lineArray = useStore((state: any) => state.lineArray)
    const updateLineByIndex = useStore((state: any) => state.updateLineByIndex)
    const dragInfo = useStore((state: any) => state.dragInfo)
    const setDragInfo = useStore((state: any) => state.setDragInfo)
    const focusLine = useStore((state: any) => state.focusLine)
    const updateFocusLine = useStore((state: any) => state.updateFocusLine)
    const isPreviewMode = useStore((state: any) => state.isPreviewMode)

    const [focusePoint, setFocusPoint] = useState() as any

    const isFocuseLine = focusLine && focusLine.index === lineIndex

    const lineColor = isFocuseLine ? 0xff7d49 : line.color

    const dashSize = 0.1
    const dashOffset = 0
    const dashScale = 1
    const gapSize = 0.1

    const getPointsArray = useCallback(() => {
        const points = line.points.map((point: any) => {
            if( !point.parent )
                return point.pos

            const parentObject = objectArray.filter((object: any) => object.id === point.parent.id)
            if( !parentObject.length )
                return [0, 0, 0]
            return parentObject[0].pos
        })
        return points
    }, [ line, objectArray ])

    const getArrowInfo = useCallback(() => {
        const isDrawing = dragInfo.isDragging && dragInfo.type === 'line' && lineIndex === lineArray.length - 1

        const points = getPointsArray()
        const vec1 = new THREE.Vector3( points.at(-2)[0], points.at(-2)[1], points.at(-2)[2] )
        const vec2 = new THREE.Vector3( points.at(-1)[0], points.at(-1)[1], points.at(-1)[2] )

        if( isDrawing && points.length > 2 && isSamePoint( points.at(-2), points.at(-1) ) )
            vec1.set( points.at(-3)[0], points.at(-3)[1], points.at(-3)[2] )

        const dir = new THREE.Vector3();
        dir.subVectors(vec2, vec1).normalize()

        let length = new THREE.Vector3().subVectors(vec2, vec1).length()

        const color = lineColor
        const headLength = length < 0.5 ? length : 0.5
        const headWidth = 0.15

        return {
            vec1,
            vec2,
            dir,
            length,
            color,
            headLength,
            headWidth
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [line, objectArray, lineArray, dragInfo,focusLine] )

    const arrowInfo = getArrowInfo()

    const pointArray = getPointsArray()

    const getIndexOverPoint = ( hoverPoint: any ) => {
        const index = pointArray.findIndex((point: any) => (
            getFixedFloat(hoverPoint.x, 1) === getFixedFloat( point[0], 1 )
            && getFixedFloat(hoverPoint.y, 1) === getFixedFloat(point[1], 1)
            && getFixedFloat(hoverPoint.z, 1) === getFixedFloat(point[2], 1)
        ))

        if( index !== -1 && line.points[ index ].parent )
            return -1

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
                if( isPreviewMode ) return

                if( !isFocuseLine ) return

                const { hovering, event } = state
                event.stopPropagation()

                if( !hovering ) {
                    document.body.style.cursor = 'auto'
                }
            },
            onMove: (state: any) => {
                if( isPreviewMode ) return

                if( !isFocuseLine ) return

                const { event } = state
                event.stopPropagation()

                document.body.style.cursor = `url('imgs/plus.png') 10 10, pointer`

                const index = getIndexOverPoint( event.pointOnLine )

                if( index !== -1 )
                    document.body.style.cursor = `url('imgs/pinpoint.png') 10 10, pointer`
            },
            onDragStart: (state: any) => {
                if( isPreviewMode ) return

                setDragInfo({
                    isDragging: true
                })

                if( !isFocuseLine ) {
                    unSelectAll()

                    updateFocusLine({
                        index: lineIndex
                    })
                    
                    return
                }

                const { event } = state
                event.stopPropagation()

                const index = getIndexOverPoint( event.pointOnLine )
                if( index === -1 ) { /** Create new point */
                    let newIndex = -1

                    for( let i = 0; i < pointArray.length - 1; i++ ) {
                        const pointA = new THREE.Vector3( pointArray[i][0], pointArray[i][1], pointArray[i][2] )
                        const pointB = new THREE.Vector3( pointArray[i+1][0], pointArray[i+1][1], pointArray[i+1][2] )
                        
                        if( isPointbetweenTwoOthers( pointA, pointB, event.pointOnLine ) ) {
                            newIndex = i + 1
                            break
                        }
                    }

                    if( newIndex !== -1 ) {
                        const linePoints = [ ...line.points ]
                        linePoints.splice(newIndex, 0, {
                            pos: [
                                event.pointOnLine.x,
                                event.pointOnLine.y,
                                event.pointOnLine.z,
                            ]
                        })

                        const newLine = { ...line }
                        newLine.points = linePoints
                        updateLineByIndex( { line: newLine, index: lineIndex } )
                    }

                    setFocusPoint({ index: newIndex })
                } else {    
                    setFocusPoint({ index: index })
                }
            },
            onDrag: (state: any) => {
                if( isPreviewMode ) return

                if( !focusePoint )
                    return

                const { event } = state

                event.stopPropagation()

                const planeIntersectPoint = new THREE.Vector3()
                const floorPlane = new THREE.Plane(new THREE.Vector3(0, 0.001, 0), 0)
                floorPlane.translate(new THREE.Vector3(0, 0.001, 0))
                event.ray.intersectPlane(floorPlane, planeIntersectPoint)

                const linePoints = [ ...line.points ]

                const currentPoint = {
                    x: event.altKey ? Math.round(planeIntersectPoint.x) : planeIntersectPoint.x,
                    y: linePoints[focusePoint.index].pos[1],
                    z: event.altKey ? Math.round(planeIntersectPoint.z) : planeIntersectPoint.z
                }

                linePoints[focusePoint.index] = {
                    pos: [
                        currentPoint.x,
                        currentPoint.y,
                        currentPoint.z
                    ]
                }

                const newLine = { ...line }
                newLine.points = linePoints
                updateLineByIndex( { line: newLine, index: lineIndex } )
            },
            onDragEnd: (state: any) => {
                if( isPreviewMode ) return

                setDragInfo({
                    isDragging: false
                })

                setFocusPoint(null)
            }
        }
    )

    return (
        <>
            { line.isArrow ? (
                <>
                    { pointArray.length > 1 ? (
                        dragInfo.isDragging && (dragInfo.type === 'line' || dragInfo.type === 'object') ? (
                            <Line
                                points={pointArray.slice(0, pointArray.length)}
                                color={lineColor}
                                lineWidth={1}
                                dashed={ line.type === 'dash' }
                                dashSize={ dashSize }
                                dashOffset={ dashOffset }
                                dashScale={ dashScale }
                                gapSize={gapSize}
                            />
                        ) : (
                            <Line
                                points={pointArray.slice(0, pointArray.length)}
                                color={lineColor}
                                lineWidth={1}
                                dashed={ line.type === 'dash' }
                                dashSize={ dashSize }
                                dashOffset={ dashOffset }
                                dashScale={ dashScale }
                                gapSize={gapSize}
                                { ...bind() as any }
                            />
                        )
                    ) : null }

                    <arrowHelper args={[
                        arrowInfo.dir,
                        arrowInfo.vec2,
                        0,
                        arrowInfo.color,
                        arrowInfo.headLength,
                        arrowInfo.headWidth,
                    ]} />
                </>
            ) : (
                dragInfo.isDragging && (dragInfo.type === 'line' || dragInfo.type === 'object') ? (
                    <Line
                        points={getPointsArray()}
                        color={lineColor}
                        lineWidth={1}
                        dashed={ line.type === 'dash' }
                        dashSize={ dashSize }
                        dashOffset={ dashOffset }
                        dashScale={ dashScale }
                        gapSize={gapSize}
                    />
                ) : (
                    <Line
                        points={getPointsArray()}
                        color={lineColor}
                        lineWidth={1}
                        dashed={ line.type === 'dash' }
                        dashSize={ dashSize }
                        dashOffset={ dashOffset }
                        dashScale={ dashScale }
                        gapSize={gapSize}
                        { ...bind() as any } 
                    />
                )
            ) }

            { isFocuseLine ? ( pointArray.map((point: any, pIndex: number) => (
                <PointSphere 
                    key={ pIndex }
                    point={ point }
                    pointIndex={ pIndex }
                    lineIndex={ lineIndex }
                    line={ line }
                />
            )) ) : null }
        </>
    )
}

export default LineComponent