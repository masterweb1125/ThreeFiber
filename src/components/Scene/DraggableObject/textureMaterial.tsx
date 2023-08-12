import { useLoader } from '@react-three/fiber'
import * as THREE from 'three'

export const TextureMaterial = ({ index, texture, selected }: any) => {
    const beforeCompileTextureBox = ( shader: any ) => {
        shader.fragmentShader = shader.fragmentShader.replace('#include <alphatest_fragment>', `
            if ( diffuseColor.a < 0.5 ) diffuseColor = vec4(1.0, 1.0, 1.0, 1.0);
        `)
    }

    const map = useLoader(THREE.TextureLoader, texture)

    return (
        <meshStandardMaterial 
            attach={`material-${index}`}
            transparent 
            map={ map as any } 
            onBeforeCompile={ beforeCompileTextureBox } 
            emissive={ !selected ? 0x000000 : 0xaaaaaa}
        />
    )
}