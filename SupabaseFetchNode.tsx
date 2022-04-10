import { Handle, Position } from "react-flow-renderer"
import { createClient } from "https://cdn.skypack.dev/@supabase/supabase-js"
import { useCallback, useState, useEffect, useRef } from "react"
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

export default function SupabaseFetchNode({ data }) {
    const [inputValues, setValues] = useState({
        url: "",
        key: "",
    })

    const [supabase, setSupabase] = useState(null)

    const urlRef = useRef()
    const keyRef = useRef()

    useEffect(() => {
        console.log(data)
        if (urlRef === undefined || keyRef === undefined) return
        if (data.supabase !== undefined && supabase == undefined) {
            urlRef.current.value = data.supabase.supabaseUrl
            keyRef.current.value = data.supabase.supabaseKey
            const client = createClient(
                data.supabase.supabaseUrl,
                data.supabase.supabaseKey
            )
            setSupabase(client)
            data.setResult({ supabase: client })
        }
    }, [data, urlRef, keyRef])

    const onConenct = async () => {
        const supabase = createClient(inputValues.url, inputValues.key)
        setSupabase(supabase)
        data.setResult({ supabase: supabase })
    }

    function updateInputs(url, key) {
        setValues({
            url: url || inputValues.url,
            key: key || inputValues.key,
        })
    }

    const getProgress = () => {
        return supabase != null ? 0 : 1
    }

    return (
        <>
            <style>{containerStyle}</style>
            <div
                className="container selectable"
                style={{ background: data.color || "white" }}
            >
                <img
                    style={{
                        filter: "grayscale(" + getProgress() + ")",
                    }}
                    src="https://qsxfdqhsuyovskknxkaj.supabase.co/storage/v1/object/public/imagefetch/supabase-logo-icon_1.png"
                    width="30"
                    height="30"
                ></img>
                <h3>Supabase</h3>

                <div className="inputs">
                    <input
                        ref={urlRef}
                        className="nodrag"
                        onChange={(evt) => {
                            updateInputs(evt.target.value, undefined)
                        }}
                        id="supURL"
                        name="URL"
                        placeholder="Supabase URL"
                    />
                    <input
                        type={"password"}
                        ref={keyRef}
                        className="nodrag"
                        onChange={(evt) =>
                            updateInputs(undefined, evt.target.value)
                        }
                        id="supKey"
                        name="publicKey"
                        placeholder="Anon/public Key"
                    />
                    <button onClick={onConenct}> Connect </button>
                </div>

                <Handle
                    type="source"
                    position={Position.Right}
                    id="a"
                    style={handleStyle}
                />
            </div>
        </>
    )
}

//https://qsxfdqhsuyovskknxkaj.supabase.co
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MDM3ODAxMCwiZXhwIjoxOTU1OTU0MDEwfQ.STNbut59AMoiD6Zd6O4oi0NJ__8fKahZitQPnWffK0E
