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

export default function ValueInputNode({ data }) {
    const [value, setValue] = useState({
        value: undefined,
    })

    const valueRef = useRef()

    useEffect(() => {
        if (data.value !== undefined && value.value === undefined) {
            valueRef.current.value = data.value
            setValue({ value: data.value })
        }
    }, [])

    return (
        <>
            <style>{containerStyle}</style>
            <div
                className="container selectable"
                style={{ background: data.color || "white" }}
            >
                <h3>Input Node</h3>
                <input
                    ref={valueRef}
                    placeholder="Value"
                    className="no drag"
                    type="text"
                    onChange={(val) => {
                        let value = val.target.value
                        if (isNaN(value)) {
                            setValue({ value: value })
                        } else if (value.includes(".")) {
                            value = Number.parseFloat(value)
                            setValue({ value: value })
                        } else {
                            value = Number.parseInt(value)
                            setValue({ value: value })
                        }
                        data.setResult({ value: value })
                    }}
                />

                <Handle
                    id="a"
                    type="source"
                    position={Position.Right}
                    style={handleStyle}
                />
            </div>
        </>
    )
}
