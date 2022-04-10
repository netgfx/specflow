import { Handle, Position } from "react-flow-renderer"
import { useCallback, useState, useEffect, useRef } from "react"

const containerStyle = `

.selected .container{
    box-shadow: 1px 3px 3px 3px rgba(0,0,0,0.1);
}
.container{
    display:flex;
    gap:5px;
    flex-direction:column;
    align-items:center;
    width: 200px;
    background: white;
    border: 1px solid black;
    padding: 5px;
    border-radius:10px;
    min-height:35px;
    max-width: 500px;
}`

const handleStyle = {
    width: 10,
    height: 10,
}

export default function ToggleNode({ data, ...props }) {
    const [checked, setChecked] = useState(false)
    const [value, setValue] = useState({
        value: undefined,
    })

    const valueRef = useRef()

    useEffect(() => {
        if (
            data.value !== undefined &&
            data.checked === undefined &&
            data.data3 === undefined
        ) {
            valueRef.current.checked = data.checked
            setChecked(data.checked)
        }
    }, [])

    return (
        <>
            <style>{containerStyle}</style>
            <div
                className="container selectable"
                style={{ background: data.color || "white" }}
            >
                <h3>Toggle Node</h3>

                <input
                    disabled={data.data3 !== undefined}
                    ref={valueRef}
                    className="no drag"
                    type="checkBox"
                    onChange={(val) => {
                        let value = val.target.checked
                        setChecked(value)
                        if (
                            data.data1 !== undefined &&
                            data.data2 !== undefined
                        ) {
                            data.setResult({
                                value: value
                                    ? data.data2.value
                                    : data.data1.value,
                                checked: value,
                            })
                            return
                        }
                        data.setResult({ checked: true })
                    }}
                />

                <Handle
                    id="1"
                    type="target"
                    position={Position.Left}
                    style={{ ...handleStyle, top: "25%" }}
                />
                <Handle
                    id="3"
                    type="target"
                    position={Position.Left}
                    style={{ ...handleStyle, top: "50%" }}
                />
                <Handle
                    id="2"
                    type="target"
                    position={Position.Left}
                    style={{ ...handleStyle, top: "75%" }}
                />
                <Handle
                    id="c"
                    type="source"
                    position={Position.Right}
                    style={handleStyle}
                />
            </div>
        </>
    )
}
