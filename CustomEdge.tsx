import React from "react"
import { getBezierPath, getEdgeCenter, getMarkerEnd } from "react-flow-renderer"

const foreignObjectSize = 40
const edgeStyle = `

.react-flow__edges{
    z-index:2 !important;
}

.edgebutton {
  width: 20px;
  height: 20px;
  background: #eee;
  border: 1px solid #fff;
  cursor: pointer;
  border-radius: 50%;
  font-size: 12px;
  line-height: 1;
}

.edgebutton:hover {
  box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.08);

}

.edgebutton-foreignobject{
    pointer-events:auto !important;
}

.edgebutton-foreignobject div {
  background: transparent;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 40px;
}
`

export default function CustomEdge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    markerEnd,
}) {
    const edgePath = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    })
    const [edgeCenterX, edgeCenterY] = getEdgeCenter({
        sourceX,
        sourceY,
        targetX,
        targetY,
    })

    return (
        <>
            <path
                id={id}
                style={style}
                className="react-flow__edge-path"
                d={edgePath}
                markerEnd={markerEnd}
            />
            <style>{edgeStyle}</style>
            <foreignObject
                width={foreignObjectSize}
                height={foreignObjectSize}
                x={edgeCenterX - foreignObjectSize / 2}
                y={edgeCenterY - foreignObjectSize / 2}
                className="edgebutton-foreignobject"
                requiredExtensions="http://www.w3.org/1999/xhtml"
            >
                <div>
                    <button className="edgebutton">×</button>
                </div>
            </foreignObject>
        </>
    )
}
