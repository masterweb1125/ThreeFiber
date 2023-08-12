import { ang2Rad } from "../helper/math"

export const cameraProps = {
    fov: 70,
    aspect: 16 / 9,
    near: 1,
    far: 1000,
    position: {
        x: 4,
        y: 8,
        z: 9,
    }
}

export const backgroundColor = 0xF5F5F5

export const orbitControlProps = {
    target: [0, 0, 0],
    minPolarAngle: 0,
    maxPolarAngle: ang2Rad(360),
    maxDistance: 50,
    minDistance: 10,
}

export const rendererProps = {
    color: 0xffffff
}

export const ambientLightProps = {
    color: 0xa0a0a0
}

export const directionalLightProps = {
    color: 0xffffff,
    intensity: 1.5,
    position: {
        x: 0,
        y: 5,
        z: 10,
    }
}

export const gridProps = {
    size: 15,
    divisions: 30,
    drawAxis: false,
}