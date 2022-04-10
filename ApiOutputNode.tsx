import { Handle, Position } from "react-flow-renderer"
import { useCallback, useState, useEffect } from "react"

const containerStyle = `

.selected .container{
    box-shadow: 1px 3px 3px 3px rgba(0,0,0,0.1);
}
.container.api-output {
    display:flex;
    gap:5px;
    flex-direction:column;
    align-items:center;
    width:fit-content;
    background: white;
    border: 1px solid black;
    padding: 5px;
    border-radius: 10px;
    min-height:35px;
}`

const handleStyle = {
    width: 10,
    height: 10,
}

export default function ApiOutputNode({ data, id, ...props }) {
    const [result, setResult] = useState(undefined)

    useEffect(() => {
        console.log("data changed ", data)
        if (data.data?.table === undefined && result !== undefined) {
            console.log("clear Result")
            setResult(undefined)

            return
        }
        if (
            data.data?.airtableBase !== undefined &&
            data.data.table !== undefined
        ) {
            const filterType = data.data.type
            let value = data.data.value
            if (value === undefined || isNaN(value)) {
            } else if (value.includes(".")) {
                value = Number.parseFloat(value)
            } else {
                value = Number.parseInt(value)
            }
            var base = data.data.airtableBase
            console.log("fetching airtable ", data, base.toString())

            base(data.data.table)
                .select({})
                .eachPage(
                    function page(records, fetchNextPage) {
                        // This function (`page`) will get called for each page of records.

                        records.forEach(function (record) {
                            if (data.data.table !== undefined) {
                                if (filterType === undefined) {
                                    setResult(record["_rawJson"].fields)
                                } else if (filterType === "eq") {
                                    if (
                                        record["_rawJson"].fields[
                                            data.data.column.column_name
                                        ] === value
                                    ) {
                                        setResult(record["_rawJson"].fields)
                                    }
                                } else if (filterType === "lt") {
                                    if (
                                        record["_rawJson"].fields[
                                            data.data.column.column_name
                                        ] < value
                                    ) {
                                        setResult(record["_rawJson"].fields)
                                    }
                                } else if (filterType === "gt") {
                                    if (
                                        record["_rawJson"].fields[
                                            data.data.column.column_name
                                        ] > value
                                    ) {
                                        setResult(record["_rawJson"].fields)
                                    }
                                }
                                console.log(
                                    "Retrieved",
                                    record["_rawJson"].fields
                                )
                            }
                        })
                        // To fetch the next page of records, call `fetchNextPage`.
                        // If there are more records, `page` will get called again.
                        // If there are no more records, `done` will get called.
                        fetchNextPage()
                    },
                    function done(err) {
                        if (err) {
                            console.error(err)
                            return
                        }
                    }
                )
        }
        if (data.data?.supabase !== undefined) {
            const supabase = data.data.supabase
            fetchData(
                supabase,
                data.data.type,
                data.data.table,
                data.data.value,
                data.data.column
            )
        }
    }, [data])

    const fetchData = async (supabase, filter, table, value, column) => {
        const valueType = column?.type
        let formatedValue = data.data.value
        if (formatedValue === undefined || isNaN(value)) {
        } else if (value.includes(".")) {
            formatedValue = Number.parseFloat(value)
        } else {
            formatedValue = Number.parseInt(value)
        }
        if (filter === undefined) {
            let { data, error } = await supabase.from(table).select("*")
            if (error === null) {
                setResult(data[0])
            }
        }
        if (filter === "eq") {
            let { data, error } = await supabase
                .from(table)
                .select("*")
                .eq(column["column_name"], formatedValue)
            console.log(data, error)
            if (error === null) {
                setResult(data[0])
            }
        } else if (filter === "lt") {
            let { data, error } = await supabase
                .from(table)
                .select("*")
                .lt(column["column_name"], formatedValue)
            console.log(data, error)
            if (error === null) {
                setResult(data[0])
            }
        } else if (filter === "gt") {
            let { data, error } = await supabase
                .from(table)
                .select("*")
                .gt(column["column_name"], formatedValue)
            console.log(data, error)
            if (error === null) {
                setResult(data[0])
            }
        }
    }

    return (
        <>
            <style>{containerStyle}</style>
            <div
                className="container api-output selectable"
                style={{ background: data.color || "white" }}
            >
                {result === undefined ? (
                    <h2>No Data (Requires Filter or select table node)</h2>
                ) : (
                    <table style={{ maxWidth: 500 }}>
                        <thead>
                            <tr>
                                <td>
                                    <h3>Column</h3>
                                </td>
                                <td>
                                    <h3>Value</h3>
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(result).map((el) => {
                                return (
                                    <tr>
                                        <td>{el}</td>
                                        <td>
                                            {(result[el] === null
                                                ? "NULL"
                                                : result[el]
                                            ).toString()}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                )}
            </div>
            <Handle
                type="target"
                position={Position.Left}
                style={handleStyle}
            />
        </>
    )
}
