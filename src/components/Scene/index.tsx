import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import { ambientLightProps, backgroundColor, cameraProps, directionalLightProps, orbitControlProps } from '../../constants/scene'
import useStore from '../../store'
import DraggableObject from './DraggableObject'
import { Image, OrbitControls, Plane, Preload, Text } from '@react-three/drei'
import { EffectComposer, Outline, Selection, Select } from '@react-three/postprocessing'
import { GridRenderer } from './GridHelper'
import FrameHelper from './FrameHelper'
import LineComponent from './Line'
import { cameraTypes } from '../../constants'
import { OrthoCamera } from './Camera/OrthoCamera'
import { useRef } from 'react'
import { OutLineEffect } from './EffectComposer/Outline'
import lineIcon from '../../assets/icons/line.png'
import arrowLineIcon from '../../assets/icons/arrow.png'
import textIcon from '../../assets/icons/text.png'
import TextComponent from './TextComponent'
import useUnSelect from '../../hooks/useUnSelect'

/**
 * 
 * Pre-render line button images and text
 */

const PreRenderImages = () => {
    return (
        <>
            <Text 
                fillOpacity={ 0 }
                color="black" 
                anchorX="center" 
                anchorY="middle" 
                fontSize={0.5} 
                position={[0, 1.5, 0]}
            >
                { 'prerender' }
            </Text>

            <Image 
                url={textIcon} 
                opacity={ 0 } 
                transparent 
                scale={0.3} 
                position={[1.1, 0.15, 0]}
            />

            <Image 
                url={arrowLineIcon} 
                opacity={ 0 } 
                transparent 
                scale={0.3} 
                position={[1.1, 0.15, 0]}
            />
            <Image 
                url={lineIcon} 
                opacity={ 0 } 
                transparent 
                scale={0.3} 
                position={[1.1, -0.2, 0]}
            />
        </>
    )
}

export const Scene = () => {
    const { unSelectAll } = useUnSelect()

    const dragInfo = useStore((state: any) => state.dragInfo)
    const setDragInfo = useStore((state: any) => state.setDragInfo)
    const floorPlane = new THREE.Plane(new THREE.Vector3(0, 0.001, 0), 0)
    floorPlane.translate(new THREE.Vector3(0, 0.001, 0))

    const objectArray = useStore((state: any) => state.objectArray)
    const lineArray = useStore( (state: any) => state.lineArray )
    const updateLineArray = useStore( (state: any) => state.updateLineArray )
    const updateLineByIndex = useStore( (state: any) => state.updateLineByIndex )
    const textArray = useStore( (state: any) => state.textArray )

    const cameraType = useStore((state: any) => state.cameraType)

    const controlRef = useRef() as any

    const selectedObjectArray = objectArray.filter((object: any) => object.selected)
    const unSelectedObjectArray = objectArray.filter((object: any) => !object.selected)

    const onPointerMissedHandler = (event: any) => {
        if( dragInfo.isDragging && dragInfo.type === 'line' ) {
            const newLineArray = [ ...lineArray ]

            if( event.button === 0 ) {
                const currentLine = { ...newLineArray.at(-1) }
                const currentLinePoints = [ ...currentLine.points ]
                currentLinePoints.push(currentLine.points.at(-1))
                currentLine.points = currentLinePoints
                newLineArray[ newLineArray.length-1 ] = currentLine

                updateLineByIndex({line: currentLine, index: newLineArray.length - 1})
            } else if ( event.button === 2 ) {
                setDragInfo({
                    isDragging: false,
                    type: null
                })
                newLineArray.splice( newLineArray.length - 1, 1 )

                updateLineArray(newLineArray)
            }
        } else {
            unSelectAll()
        }
    }

    return (
        <Canvas
            onPointerMissed={ onPointerMissedHandler }
            camera={{ fov: cameraProps.fov, position: [ cameraProps.position.x, cameraProps.position.y, cameraProps.position.z ] }}
            shadows
        > 
            {/* <color attach="background" args={[ backgroundColor ]} /> */}

            { cameraType === cameraTypes['Orthographic'] ? (
                <OrthoCamera control={ controlRef.current } />
            ) : null }

            <GridRenderer />

            <ambientLight 
                color={ ambientLightProps.color }
            />
            
            <directionalLight 
                color={ directionalLightProps.color }
                intensity={ directionalLightProps.intensity }
                position={[ directionalLightProps.position.x, directionalLightProps.position.y, directionalLightProps.position.z ]}
            />

            <OrbitControls 
                minZoom={10}
                maxZoom={50} 
                minPolarAngle={orbitControlProps.minPolarAngle}
                maxDistance={orbitControlProps.maxDistance}
                minDistance={orbitControlProps.minDistance}
                target={[orbitControlProps.target[0], orbitControlProps.target[1], orbitControlProps.target[2]]}
                enabled={!dragInfo.isDragging} 
                ref={controlRef}
            />

            { lineArray.map((line: any, index: number) => (
                <LineComponent 
                    key={`line${index}`}
                    line={ line }
                    index={ index }
                />
            )) }

            { objectArray.map((object: any, index: number) => (
                <DraggableObject 
                    key={`dragObject${index}`}
                    object={ object } 
                    floorPlane={ floorPlane } 
                />
            )) }

            {/* <Selection>
                <EffectComposer autoClear={false}>
                    <Outline xRay visibleEdgeColor={ 0xff0000 } hiddenEdgeColor={ 0xff0000 } pulseSpeed={0.0} edgeStrength={2}/>
                </EffectComposer>

                { selectedObjectArray.map((object: any, index: number) => (
                    <DraggableObject 
                        key={`dragObject${index}`}
                        object={ object } 
                        floorPlane={ floorPlane } 
                    />
                )) }
            </Selection>

            <Selection>
                <EffectComposer autoClear={false}>
                    <Outline xRay visibleEdgeColor={ 0x000000 } hiddenEdgeColor={ 0x000000 } pulseSpeed={0.0} edgeStrength={2}/>
                </EffectComposer>

                { unSelectedObjectArray.map((object: any, index: number) => (
                    <DraggableObject 
                        key={`dragObject${index}`}
                        object={ object } 
                        floorPlane={ floorPlane } 
                    />
                )) }
            </Selection> */}

            { textArray.map((item: any, index: number) => (
                <TextComponent 
                    key={`textArray${index}`}
                    textItem={ item }
                    itemIndex={ index }
                />
            )) }

            <FrameHelper />

            <Preload all />

            <PreRenderImages />

            {/* <OutLineEffect objectArray={ objectArray } /> */}
        </Canvas>
    )
}

export default Scene