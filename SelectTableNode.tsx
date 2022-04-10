import { Handle, Position } from "react-flow-renderer"
import {
    createClient,
    rpc,
} from "https://cdn.skypack.dev/@supabase/supabase-js"
import { useCallback, useState, useEffect, useRef } from "react"
import _ from "lodash"

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

const handleStyle = {
    width: 10,
    height: 10,
}

export default function SelectTableNode({ data }) {
    const [table, setTable] = useState("")
    const [supabase, setSupabase] = useState()
    const [hasAirtable, setHasAirtable] = useState(false)
    const tableNameRef = useRef()
    const [tables, setTables] = useState([])

    useEffect(() => {
        if (data.table !== undefined && table === "") {
            setTable(data.table)
            tableNameRef.current.value = data.table
            if (data.supabase !== undefined) {
                const client = createClient(
                    data.supabase.supabaseUrl,
                    data.supabase.supabaseKey
                )
                setSupabase(client)
                data.setResult({ supabase: client })
            } else if (data.airtableBase !== undefined) {
                console.log(data)
            }
        }
        if (
            hasAirtable === false &&
            data.data !== undefined &&
            data.data.airtableBase !== undefined
        ) {
            var base = data.data.airtableBase
            setHasAirtable(true)
        }
        if (
            data.data === undefined &&
            (supabase !== undefined || hasAirtable)
        ) {
            console.log("clearing Data")
            setTable("")
            setTables([])
            setSupabase(undefined)
            setHasAirtable(false)
            data.setResult({
                table: undefined,
                supabase: undefined,
                airtableBase: undefined,
            })
        }
        if (supabase !== undefined) return
        if (
            data.data !== undefined &&
            data.data.supabase !== undefined &&
            data.data.supabase.realtime !== undefined &&
            data.supabase === undefined
        ) {
            const supabase = data.data.supabase
            setSupabase(supabase)
            data.setResult({
                supabase: supabase,
            })
        }
    }, [data, tableNameRef.current])

    useEffect(() => {
        if (supabase) {
            if (tables.length == 0) {
                getTableNames(supabase)
            }
        }
    }, [supabase])

    const getTables = async (supabase) => {
        data.setResult({
            supabase: supabase,
        })
    }

    const getTableNames = async (supabase) => {
        let { data, error } = await supabase.rpc("get_t_names")

        if (error) console.error(error)
        else {
            var tables = _.uniqBy(JSON.parse(data), "name")

            var finalTables = _.flatMap(tables, (o) => o.name)
            setTable(finalTables[0])
            console.log(finalTables)
            setTables(finalTables)
        }
    }

    return (
        <>
            <style>{containerStyle}</style>

            <div
                className="container"
                style={{ background: data.color || "white" }}
            >
                {data.table !== undefined ||
                supabase !== undefined ||
                hasAirtable ? (
                    <>
                        <h3>Table</h3>
                        <select
                            style={{
                                display: tables.length > 0 ? "block" : "none",
                            }}
                            className="nodrag"
                            onChange={(val) => {
                                console.log("selected ", val.target.value)
                                setTable(val.target.value)
                            }}
                        >
                            {tables.map((item) => (
                                <option value={item}>{item}</option>
                            ))}
                        </select>
                        <input
                            style={{
                                display: tables.length > 0 ? "none" : "block",
                            }}
                            ref={tableNameRef}
                            className="nodrag"
                            type="text"
                            placeholder={"Table name"}
                            onChange={(val) => {
                                console.log(val.target.value)
                                setTable(val.target.value)
                            }}
                        />
                        <button
                            onClick={() => {
                                data.setResult({
                                    table: table,
                                    supabase: supabase,
                                    airtableBase: data.data?.airtableBase,
                                })
                            }}
                        >
                            Set
                        </button>
                    </>
                ) : (
                    <p style={{ textAlign: "center" }}>
                        Connect Supabase or Airtable Node
                    </p>
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
            </div>
        </>
    )
}
