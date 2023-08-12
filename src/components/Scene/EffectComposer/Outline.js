import { extend, useThree } from "@react-three/fiber"
import { useCallback, useMemo, useRef } from "react"
import { Vector2 } from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer"
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass"
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass"
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader"
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'

extend({ OrbitControls, EffectComposer, RenderPass, OutlinePass, ShaderPass })

export const OutLineEffect = ({ objectArray }) => {
    const { gl, scene, camera, size } = useThree()

    const composer = useRef()

    const aspect = useMemo(() => new Vector2(size.width, size.height), [size])

    const getSelectedObjects = useCallback(() => {
        return objectArray.map((object) => object.scene)
    }, [objectArray])

    return (
        <effectComposer ref={composer} args={[gl]}>
            <renderPass attachArray="passes" args={[scene, camera]} />
            <outlinePass
                attachArray="passes"
                args={[aspect, scene, camera]}
                selectedObjects={[ getSelectedObjects() ]}
                visibleEdgeColor="red"
                edgeStrength={50}
                edgeThickness={1}
            />
            <shaderPass attachArray="passes" args={[FXAAShader]} uniforms-resolution-value={[1 / size.width, 1 / size.height]} />
        </effectComposer>
    )
}