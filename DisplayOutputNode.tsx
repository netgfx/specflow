import { Handle, Position } from "react-flow-renderer"
import { useCallback, useState } from "react"

const containerStyle = `

.selected .container{
    box-shadow: 1px 3px 3px 3px rgba(0,0,0,0.1);
}

p.display {
    font-size:18;
    font-weight:500;
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

export default function DisplayNode({ data }) {
    console.log(data.data)
    return (
        <>
            <style>{containerStyle}</style>
            <div
                className="container selectable"
                style={{ background: data.color || "white" }}
            >
                <p display>
                    {(
                        data.data?.value ||
                        data.data?.result ||
                        "No Data"
                    ).toString()}{" "}
                </p>
                <Handle
                    type="target"
                    position={Position.Left}
                    style={handleStyle}
                />
            </div>
        </>
    )
}
