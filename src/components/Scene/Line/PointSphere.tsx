import useStore from "../../../store"
import * as THREE from 'three'
import {useGesture } from "@use-gesture/react"

export const PointSphere = ({ point, pointIndex, lineIndex, line }: any) => {
    const setDragInfo = useStore((state: any) => state.setDragInfo)
    const updateLineByIndex = useStore((state: any) => state.updateLineByIndex)

    const bind = useGesture(
        {
            onHover: (state: any) => {
                const { hovering } = state

                if( !hovering ) {
                    document.body.style.cursor = 'auto'
                }
            },
            onMove: (state: any) => {
                const { event } = state
                event.stopPropagation()

                document.body.style.cursor = `url('imgs/pinpoint.png') 10 10, pointer`
            },
            onDragStart: (state: any) => {
                const { event } = state
                event.stopPropagation()

                setDragInfo({
                    isDragging: true
                })
            },
            onDrag: (state: any) => {
                const { event } = state
                event.stopPropagation()

                const planeIntersectPoint = new THREE.Vector3()
                const floorPlane = new THREE.Plane(new THREE.Vector3(0, 0.001, 0), 0)
                floorPlane.translate(new THREE.Vector3(0, 0.001, 0))
                event.ray.intersectPlane(floorPlane, planeIntersectPoint)

                const linePoints = [ ...line.points ]

                const currentPoint = {
                    x: event.altKey ? Math.round(planeIntersectPoint.x) : planeIntersectPoint.x,
                    y: linePoints[ pointIndex ].pos[1],
                    z: event.altKey ? Math.round(planeIntersectPoint.z) : planeIntersectPoint.z
                }

                linePoints[ pointIndex ] = {
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
                setDragInfo({
                    isDragging: false
                })
            }
        }
    )

    const onDoubleClickHandler = (event: any) => {
        event.stopPropagation()

        const linePoints = [ ...line.points ]
        linePoints.splice( pointIndex, 1 )

        const newLine = { ...line }
        newLine.points = linePoints
        updateLineByIndex( { line: newLine, index: lineIndex } )
    }

    return (
        <mesh
            position={[ point[0],  point[1], point[2] ]}
            { ...bind() as any }
            onDoubleClick={ onDoubleClickHandler }
        >
            <sphereBufferGeometry args={[0.07, 30, 30]} attach="geometry"/>
            <meshStandardMaterial color="hotpink" attach={'material'} />
        </mesh>
    )
}

export default PointSphere