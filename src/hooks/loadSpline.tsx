import React, { useEffect } from "react"
import SplineLoader from '@splinetool/loader'
import useStore from "../store";

const splineFiles=[
    '/models/huaweicloudscene.splinecode',
    '/models/alicloudscene.splinecode'
];

export const LoadSpline = () => {
    const componentArray = useStore((state: any) => state.componentArray)    
    const updateComponentByIndex = useStore((state: any) => state.updateComponentByIndex)

    const updateIsLoadingModel = useStore((state: any) => state.updateIsLoadingModel)

    const loadComposbyProvider = ( file: string ) => {
        return new Promise((resolve, reject) => {
            const loader = new SplineLoader()

            loader.load( file, (splineScene: any) => {
                splineScene.children.forEach((o: any) => {
                    o.position.multiplyScalar(0.015)
                    o.position.x = 0
                    o.position.z = 0
                    o.scale.multiplyScalar(0.015)

                    const compIndex = componentArray.findIndex((component: any) => component.uuid === o.uuid)
                    if( compIndex !== -1 ) {
                        o.rotation.set(0, 0, 0)
                        o.updateMatrixWorld()

                        const newComponent = { ...componentArray[ compIndex ] }
                        newComponent.scene = o

                        updateComponentByIndex({ index: compIndex, value: newComponent })
                    }
                })
                resolve('done!')
            })
        })
    }

    useEffect(() => {
        const promises = [] as any
        splineFiles.map((item: any) => promises.push( loadComposbyProvider(item) ))

        Promise.all(promises).then((res: any) => {
            updateIsLoadingModel(false)
        }).catch((error: any) => console.error(error))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <></>
    )
}

export default LoadSpline