import { OrthographicCamera } from "@react-three/drei"
import { useThree } from "@react-three/fiber"

export const OrthoCamera = ({ control }: any) => {
    const { camera } = useThree()

    return (
        <OrthographicCamera 
            makeDefault 
            zoom={ 40 }
            position={[camera.position.x, camera.position.y, camera.position.z]}
        />
    )
}