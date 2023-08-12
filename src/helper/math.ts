export const rad2Ang = (rad: number) => rad * 180 / Math.PI;

export const ang2Rad = (ang: number) => ang * Math.PI / 180;

export const getRandomVal = (range: number) => Math.ceil(Math.random() * 100000000) % range;

export const isSamePoint = ( point1: any, point2: any ) => point1[0] === point2[0] && point1[1] === point2[1] && point1[2] === point2[2]

export const getFixedFloat = (val: any, len: number) => Number(val.toFixed(len))