import { Handle, Position } from "react-flow-renderer"
import { createClient } from "https://cdn.skypack.dev/@supabase/supabase-js"
import { useCallback, useState, useEffect, useRef } from "react"

import Airtable from "airtable"

const handleStyle = {
    width: 10,
    height: 10,
}

const containerStyle = `
.container{
    display:flex;
    gap:5px;
    flex-direction:column;
    align-items:center;
    width: 200px;
    background: white;
    border: 1px solid black;
    padding: 5px;
    border-radius:3%;
    min-height:35px;
}

.selected .container{
    box-shadow: 1px 3px 3px 3px rgba(0,0,0,0.1);
}

.row {
    width:100%;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    display:flex;
    gap:5px;
}

.status {
    border: 1px solid rgba(0,0,0,0.4);
    position:absolute;
    right :5px;
    top:5px;
    width: 18px;
    height:18px;
    border-radius:100%;
    background:red;
}

.status.ready {
    background:green;
}


.inputs{
    display:flex;
    flex-grow:1;
    gap:5px;
    padding-bottom:10px;
    flex-direction:column;
    align-items:center;
}

.container img {
    pointer-events:none;
}
`

export default function AirTableNode({ data }) {
    const [key, setKey] = useState("")
    const [baseID, setBase] = useState("")
    const keyRef = useRef()
    const baseRef = useRef()

    useEffect(() => {
        if (data.key !== undefined && key === "") {
            keyRef.current.value = data.key
            baseRef.current.value = data.baseID
            setKey(data.key)
            setBase(data.baseID)
            var base = new Airtable({ apiKey: data.key }).base(data.baseID)
            data.setResult({
                airtableBase: base,
                key: data.key,
                baseID: data.baseID,
            })
        }
    }, [])

    const onConenct = () => {
        var base = new Airtable({ apiKey: key }).base(baseID)
        console.log("saved", { airtableBase: base, key: key, baseID: baseID })
        data.setResult({ airtableBase: base, key: key, baseID: baseID })
    }

    const getProgress = () => {
        return baseID != "" ? 0 : 1
    }
    return (
        <>
            <style>{containerStyle}</style>
            <div
                className="container"
                style={{ background: data.color || "white" }}
            >
                <img
                    style={{
                        filter: "grayscale(" + getProgress() + ")",
                    }}
                    src="https://qsxfdqhsuyovskknxkaj.supabase.co/storage/v1/object/public/imagefetch/airtable-icon.png"
                    width="30"
                    height="30"
                ></img>
                <h3>AirTable</h3>
                <div className="inputs">
                    <input
                        ref={keyRef}
                        className="nodrag"
                        onChange={(evt) => {
                            setKey(evt.target.value)
                        }}
                        id="text"
                        name="api-key"
                        placeholder="AirTable API Key"
                    />
                    <input
                        ref={baseRef}
                        className="nodrag"
                        onChange={(evt) => {
                            setBase(evt.target.value)
                        }}
                        id="text"
                        name="base"
                        placeholder="AirTable base Id "
                    />

                    <button onClick={onConenct}> Connect </button>
                </div>
            </div>
            <Handle
                type="source"
                position={Position.Right}
                id="a"
                style={handleStyle}
            />
        </>
    )
}
