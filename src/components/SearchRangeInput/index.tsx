import { useState } from "react"
import { Search } from "react-feather"
import { getTrackBackground, Range } from "react-range"

export const SearchRangeInput = () => {
    const [values, setValues] = useState([50])

    const STEP = 0.1;
    const MIN = 0;
    const MAX = 100;

    return (
        <div className="flex justify-center items-center">
            <Search size={'18'} className={'mr-4'} color={'#5C426C'} />

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                }}
            >
                <Range
                    values={values}
                    step={STEP}
                    min={MIN}
                    max={MAX}
                    onChange={(values) => setValues(values)}
                    renderTrack={({ props, children }) => (
                        <div
                            onMouseDown={props.onMouseDown}
                            onTouchStart={props.onTouchStart}
                            style={{
                                ...props.style,
                                height: "20px",
                                display: "flex",
                                width: "100%"
                            }}
                        >
                            <div
                                ref={props.ref}
                                style={{
                                    height: "3px",
                                    width: "126px",
                                    borderRadius: "4px",
                                    background: getTrackBackground({
                                        values: values,
                                        colors: ["#000000", "#000000"],
                                        min: MIN,
                                        max: MAX
                                    }),
                                    alignSelf: "center"
                                }}
                            >
                                {children}
                            </div>
                        </div>
                    )}
                    renderThumb={({ props, isDragged }) => (
                        <div
                            {...props}
                            style={{
                                ...props.style,
                                height: "15px",
                                width: "15px",
                                outline: 'unset',
                                borderRadius: "15px",
                                backgroundColor: "#D9D9D9",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                        </div>
                    )}
                />
            </div>
        </div>
    )
}