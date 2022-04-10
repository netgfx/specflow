import { createClient } from "https://cdn.skypack.dev/@supabase/supabase-js"

export function remapNodeData(newEdges, nodes, setNodes, oldEdges) {
    console.log("remap")
    newEdges.forEach((edg) => {
        const sourceId = edg.source
        const targetId = edg.target
        const sourceNode = nodes.find((el) => el.id === sourceId)
        setNodes(
            nodes.map((element) => {
                if (element.id === targetId) {
                    if (edg.targetHandle == "1") {
                        element.data = {
                            ...element.data,
                            data1:
                                sourceNode !== undefined
                                    ? { ...sourceNode.data }
                                    : undefined,
                        }
                    } else if (edg.targetHandle == "2") {
                        element.data = {
                            ...element.data,
                            data2:
                                sourceNode !== undefined
                                    ? { ...sourceNode.data }
                                    : undefined,
                        }
                    } else if (edg.targetHandle == "3") {
                        element.data = {
                            ...element.data,
                            data3:
                                sourceNode !== undefined
                                    ? { ...sourceNode.data }
                                    : undefined,
                        }
                    } else {
                        element.data = {
                            ...element.data,
                            data:
                                sourceNode !== undefined
                                    ? { ...sourceNode.data }
                                    : undefined,
                        }
                    }
                }
                return element
            })
        )
    })
    if (oldEdges === undefined) return
    oldEdges.forEach((edg) => {
        if (!newEdges.includes(edg)) {
            setNodes(
                nodes.map((element) => {
                    if (element.id === edg.target) {
                        if (edg.targetHandle == "1") {
                            element.data = {
                                ...element.data,
                                data1: undefined,
                            }
                        } else if (edg.targetHandle == "2") {
                            element.data = {
                                ...element.data,
                                data2: undefined,
                            }
                        } else if (edg.targetHandle == "3") {
                            element.data = {
                                ...element.data,
                                data3: undefined,
                            }
                        } else {
                            element.data = {
                                ...element.data,
                                data: undefined,
                            }
                        }
                    }
                    return element
                })
            )
        }
    })
}

export function onNodeDataRestore(nodes, edges, setNodes) {
    const newNodes = nodes.map((node) => {
        if (node.data.has("supabase")) {
            const supabaseData = node.data.supabase
            node.data.set(
                "supabase",
                createClient(supabaseData.supabaseUrl, supabaseData.supabseKey)
            )
        }
    })
    remapNodeData(edges, newNodes, setNodes, undefined)
}

export const handleStyle = {
    width: 10,
    height: 10,
}
