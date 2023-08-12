import { useState } from "react"
import styled from "styled-components"
import { useGesture } from "@use-gesture/react"
import { pauseEvent } from "../../utils/helper"
import useStore from "../../store"

const ObjectButton = styled.div`
    font-family: 'Manrope';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 150%;
    color: black;
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    border: 1px solid #00000000;
    height: 144px;
    overflow: hidden;

    cursor: pointer;

    &:hover {
        opacity: 0.8;
        border: 1px solid #c3ccd4;
        border-radius: 5px;
        background: #1b4b7a75;
    }
`

export const DraggableItem = ({ item }: any) => {
    const [ isDragging, setIsDragging ] = useState(false)
    const [ pos, setPos ] = useState({
        x: 0,
        y: 0,
    }) as any

    const setDragInfo = useStore((state: any) => state.setDragInfo)

    const bind = useGesture(
        {
            onDragStart: ({ event }: any) => {
                pauseEvent(event)

                setIsDragging(true)

                setDragInfo({
                    isDragging: true,
                    type: 'addSpline',
                    item: item
                })
        
                setPos({
                    x: event.pageX,
                    y: event.pageY,
                })
            },
            onDrag: ({ event }: any) => {
                pauseEvent(event)

                setPos({
                    x: event.pageX,
                    y: event.pageY,
                })
            },
            onDragEnd: ({ event }: any) => {
                pauseEvent(event)

                setIsDragging(false)

                setDragInfo({
                    isDragging: false,
                    type: null
                })
            }
        }
    )

    return (
        <>
            <ObjectButton 
                className="my-1 relative"
            >
                <div 
                    className="flex flex-col justify-center items-center"
                    { ...bind() as any }
    
                    style={{
                        position: isDragging ? 'fixed' : 'relative',
                        left: isDragging ? pos.x : 'unset',
                        top: isDragging ? pos.y : 'unset',
                        zIndex: isDragging ? 99 : 'unset',
                        transform: isDragging ? 'translate3d(-50%, -50%, 0)' : '',
                        touchAction: 'none',
                    }}
                >
                    <div className="img flex justify-center items-center">
                        <img src={ item.image } width={70} alt=''></img>
                    </div>

                    <h1 className="mt-4">{ item.name }</h1>

                    <div className="w-full h-full absolute" />
                </div>
            </ObjectButton>
        </>
    )
}

export default DraggableItem