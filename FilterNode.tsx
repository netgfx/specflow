import { Handle, Position } from "react-flow-renderer"
import { createClient } from "https://cdn.skypack.dev/@supabase/supabase-js"
import { useCallback, useState, useEffect, useRef } from "react"
import { handleStyle } from "./NodeUtils.tsx"

const filterToNaturalLanguage = {
    eq: "Equals",
    gt: "Greater Than",
    lt: "Less Than",
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


.inputs{
    display:flex;
    flex-grow:1;
    gap:5px;
    padding-bottom:10px;
    flex-direction:column;
    align-items:center;
}
`

export default function filterNode({ data }) {
    const [value, setValue] = useState("")
    const [column, setColumn] = useState({
        column_name: undefined,
        type: "int",
    })

    const valueRef = useRef()

    const columnRef = useRef()

    useEffect(() => {
        if (data.column !== undefined && column.column_name === undefined) {
            setColumn(data.column)
            setValue(data.value)
            valueRef.current.value = data.value
            columnRef.current.value = data.column.column_name
            if (data.supabase !== undefined) {
                data.setResult({
                    table: data.table,
                    value: data.value,
                    column: data.column,
                    supabase: createClient(
                        data.supabase.supabaseUrl,
                        data.supabase.supabaseKey
                    ),
                    type: data.type,
                })
            } else if (data.airtableBase !== undefined) {
                data.setResult({
                    table: data.table,
                    value: data.value,
                    column: data.column,
                    airtableBase: data.airtableBase,
                    type: data.type,
                })
            }
        }
        if (data.data === undefined && data.table !== undefined) {
            console.log("cleanup")
            data.setResult({
                table: undefined,
                value: undefined,
                column: undefined,
                supabase: undefined,
                airtableBase: undefined,
            })
        }
        if (column === undefined && data.data?.columns) {
            setColumn(data.data.columns[data.data.table][0])
        }
    }, [data])

    const updateResult = () => {
        data.setResult({
            table: data.data.table,
            value: value,
            column: column,
            supabase: data.data.supabase,
            airtableBase: data.data.airtableBase,
            type: data.type,
        })
    }
    return (
        <>
            <style>{containerStyle}</style>

            {data.column !== undefined ||
            (data.data !== undefined && data.data.table !== undefined) ? (
                <div
                    className="container"
                    style={{ background: data.color || "white" }}
                >
                    <h4 style={{ textAlign: "center" }}>Where</h4>
                    <input
                        ref={columnRef}
                        className="nodrag"
                        type="text"
                        placeholder={"column"}
                        onChange={(val) => {
                            setColumn((old) => {
                                return {
                                    column_name: val.target.value,
                                    type: old.type,
                                }
                            })
                        }}
                    />
                    <p style={{ textAlign: "center" }}>
                        {filterToNaturalLanguage[data.type]}{" "}
                    </p>
                    <input
                        ref={valueRef}
                        className="nodrag"
                        type="text"
                        placeholder="Value"
                        onChange={(val) => setValue(val.target.value)}
                    />

                    <button onClick={updateResult}>Fetch</button>
                </div>
            ) : (
                <div className="container">
                    {" "}
                    <h3>Connect a select table Node </h3>
                    <h4>Connects to api output Node</h4>
                </div>
            )}
            <Handle
                type="target"
                position={Position.Left}
                id="a"
                style={handleStyle}
            />
            <Handle
                type="source"
                position={Position.Right}
                id="b"
                style={handleStyle}
            />
        </>
    )
}
