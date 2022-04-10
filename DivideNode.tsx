import { Handle, Position } from "react-flow-renderer"
import { useCallback, useState, useEffect } from "react"

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

export default function DivideNode({ data }) {
    const [value, setValue] = useState({
        value: undefined,
    })

    useEffect(() => {
        if (
            value.value !== undefined &&
            (data.data1 === undefined || data.data2 === undefined)
        ) {
            setValue({ value: undefined })
        }
        if (
            data.data1 !== undefined &&
            data.data2 !== undefined &&
            value.value !== data.data1.value / data.data2.value
        ) {
            const res = data.data1.value / data.data2.value
            if (isNaN(res)) return
            setValue({ value: res })
            data.setResult({ value: res })
        }
    }, [data])

    return (
        <>
            <style>{containerStyle}</style>
            <div
                className="container selectable"
                style={{ background: data.color || "white" }}
            >
                <h3>Divide Node</h3>

                <p>
                    {value.value === undefined
                        ? "No Value"
                        : value.value.toString()}
                </p>

                <Handle
                    id="1"
                    type="target"
                    position={Position.Left}
                    style={{ ...handleStyle, top: "25%" }}
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
