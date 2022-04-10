import React, { useCallback, useEffect, useState, useMemo } from "react"
import { useStore } from "react-flow-renderer"
import { remapNodeData } from "./NodeUtils.tsx"

const transformSelector = (state) => state

const getId = (elements) => {
    if (elements.length == 0) return "0"
    return (Number.parseInt(elements[elements.length - 1].id) + 1).toString()
}

export default ({
    nodes,
    setNodes,
    anchorPoint,
    updateNodeData,
    isMobile = false,
}) => {
    const transform = useStore(transformSelector)
    const [menuSection, setmenuSection] = useState("general")
    const addInputNode = useCallback(() => {
        const rect = document
            .getElementsByClassName("react-flow")[0]
            .getBoundingClientRect()
        console.log(rect)
        const position = isMobile
            ? {
                  x: +rect.width / 2 - 75,
                  y: +rect.height / 2,
              }
            : {
                  x:
                      (anchorPoint.x - transform.transform[0]) *
                          (1 / transform.transform[2]) -
                      transform.transform[2],
                  y:
                      (anchorPoint.y - transform.transform[1]) *
                          (1 / transform.transform[2]) -
                      transform.transform[2],
              }
        setNodes((elements) => {
            const nextId = getId(elements)
            return [
                ...elements,
                {
                    id: nextId,
                    type: "valueInputNode",
                    data: {
                        setResult: (res) => onInputNodeUpdate(res, nextId),
                    },
                    position: position,
                },
            ]
        })
    }, [anchorPoint, transform.transform])

    const addIsValueNode = useCallback(() => {
        const rect = document
            .getElementsByClassName("react-flow")[0]
            .getBoundingClientRect()
        console.log(rect)
        const position = isMobile
            ? {
                  x: +rect.width / 2 - 75,
                  y: +rect.height / 2,
              }
            : {
                  x:
                      (anchorPoint.x - transform.transform[0]) *
                          (1 / transform.transform[2]) -
                      transform.transform[2],
                  y:
                      (anchorPoint.y - transform.transform[1]) *
                          (1 / transform.transform[2]) -
                      transform.transform[2],
              }
        setNodes((elements) => {
            const nextId = getId(elements)
            return [
                ...elements,
                {
                    id: nextId,
                    type: "isValueNode",
                    data: {
                        setResult: (res) => onInputNodeUpdate(res, nextId),
                    },
                    position: position,
                },
            ]
        })
    }, [anchorPoint, transform.transform])

    const addToggleNode = useCallback(() => {
        const rect = document
            .getElementsByClassName("react-flow")[0]
            .getBoundingClientRect()
        console.log(rect)
        const position = isMobile
            ? {
                  x: +rect.width / 2 - 75,
                  y: +rect.height / 2,
              }
            : {
                  x:
                      (anchorPoint.x - transform.transform[0]) *
                          (1 / transform.transform[2]) -
                      transform.transform[2],
                  y:
                      (anchorPoint.y - transform.transform[1]) *
                          (1 / transform.transform[2]) -
                      transform.transform[2],
              }
        setNodes((elements) => {
            const nextId = getId(elements)
            return [
                ...elements,
                {
                    id: nextId,
                    type: "toggleNode",
                    data: {
                        setResult: (res) => onInputNodeUpdate(res, nextId),
                    },
                    position: position,
                },
            ]
        })
    }, [anchorPoint, transform.transform])

    const addBooleanNode = useCallback(() => {
        const rect = document
            .getElementsByClassName("react-flow")[0]
            .getBoundingClientRect()
        console.log(rect)
        const position = isMobile
            ? {
                  x: +rect.width / 2 - 75,
                  y: +rect.height / 2,
              }
            : {
                  x:
                      (anchorPoint.x - transform.transform[0]) *
                          (1 / transform.transform[2]) -
                      transform.transform[2],
                  y:
                      (anchorPoint.y - transform.transform[1]) *
                          (1 / transform.transform[2]) -
                      transform.transform[2],
              }
        setNodes((elements) => {
            const nextId = getId(elements)
            return [
                ...elements,
                {
                    id: nextId,
                    type: "booleanNode",
                    data: {
                        setResult: (res) => onInputNodeUpdate(res, nextId),
                    },
                    position: position,
                },
            ]
        })
    }, [anchorPoint, transform.transform])

    const addOutputNode = useCallback(() => {
        const rect = document
            .getElementsByClassName("react-flow")[0]
            .getBoundingClientRect()
        console.log(rect)
        const position = isMobile
            ? {
                  x: +rect.width / 2 - 75,
                  y: +rect.height / 2,
              }
            : {
                  x:
                      (anchorPoint.x - transform.transform[0]) *
                          (1 / transform.transform[2]) -
                      transform.transform[2],
                  y:
                      (anchorPoint.y - transform.transform[1]) *
                          (1 / transform.transform[2]) -
                      transform.transform[2],
              }
        setNodes((elements) => {
            return [
                ...elements,
                {
                    id: getId(elements),
                    type: "displayNode",
                    data: { data: undefined },
                    position: position,
                },
            ]
        })
    }, [anchorPoint, transform.transform, nodes])

    const onInputNodeUpdate = (data, id) => {
        updateNodeData(id, data)
    }

    const addSelectTableNode = useCallback(() => {
        const rect = document
            .getElementsByClassName("react-flow")[0]
            .getBoundingClientRect()
        console.log(rect)
        const position = isMobile
            ? {
                  x: +rect.width / 2 - 75,
                  y: rect.height / 2,
              }
            : {
                  x:
                      (anchorPoint.x - transform.transform[0]) *
                          (1 / transform.transform[2]) -
                      transform.transform[2],
                  y:
                      (anchorPoint.y - transform.transform[1]) *
                          (1 / transform.transform[2]) -
                      transform.transform[2],
              }
        setNodes((elements) => {
            const nextId = getId(elements)
            return [
                ...elements,
                {
                    id: nextId,
                    type: "selectTableNode",
                    data: {
                        setResult: (res) => onInputNodeUpdate(res, nextId),
                    },
                    position: position,
                },
            ]
        })
    }, [anchorPoint, transform.transform])

    const addSupabaseFetchNode = useCallback(() => {
        const rect = document
            .getElementsByClassName("react-flow")[0]
            .getBoundingClientRect()
        const position = isMobile
            ? {
                  x: rect.width / 2 - 75,
                  y: rect.height / 2,
              }
            : {
                  x:
                      (anchorPoint.x - transform.transform[0]) *
                          (1 / transform.transform[2]) -
                      transform.transform[2],
                  y:
                      (anchorPoint.y - transform.transform[1]) *
                          (1 / transform.transform[2]) -
                      transform.transform[2],
              }
        setNodes((elements) => {
            const nextId = getId(elements)
            return [
                ...elements,
                {
                    id: nextId,
                    type: "supabaseFetchNode",
                    data: {
                        setResult: (res) => onInputNodeUpdate(res, nextId),
                    },
                    position: position,
                },
            ]
        })
    }, [anchorPoint, transform.transform])

    const addMultiplyNode = useCallback(() => {
        const rect = document
            .getElementsByClassName("react-flow")[0]
            .getBoundingClientRect()
        const position = isMobile
            ? {
                  x: rect.width / 2 - 75,
                  y: rect.height / 2,
              }
            : {
                  x:
                      (anchorPoint.x - transform.transform[0]) *
                          (1 / transform.transform[2]) -
                      transform.transform[2],
                  y:
                      (anchorPoint.y - transform.transform[1]) *
                          (1 / transform.transform[2]) -
                      transform.transform[2],
              }
        setNodes((elements) => {
            const nextId = getId(elements)
            return [
                ...elements,
                {
                    id: nextId,
                    type: "multiplyNode",
                    data: {
                        setResult: (res) => onInputNodeUpdate(res, nextId),
                    },
                    position: position,
                },
            ]
        })
    }, [anchorPoint, transform.transform])

    const addPowerNode = useCallback(() => {
        const rect = document
            .getElementsByClassName("react-flow")[0]
            .getBoundingClientRect()
        const position = isMobile
            ? {
                  x: rect.width / 2 - 75,
                  y: rect.height / 2,
              }
            : {
                  x:
                      (anchorPoint.x - transform.transform[0]) *
                          (1 / transform.transform[2]) -
                      transform.transform[2],
                  y:
                      (anchorPoint.y - transform.transform[1]) *
                          (1 / transform.transform[2]) -
                      transform.transform[2],
              }
        setNodes((elements) => {
            const nextId = getId(elements)
            return [
                ...elements,
                {
                    id: nextId,
                    type: "powerNode",
                    data: {
                        setResult: (res) => onInputNodeUpdate(res, nextId),
                    },
                    position: position,
                },
            ]
        })
    }, [anchorPoint, transform.transform])

    const addDivideNode = useCallback(() => {
        const rect = document
            .getElementsByClassName("react-flow")[0]
            .getBoundingClientRect()
        const position = isMobile
            ? {
                  x: rect.width / 2 - 75,
                  y: rect.height / 2,
              }
            : {
                  x:
                      (anchorPoint.x - transform.transform[0]) *
                          (1 / transform.transform[2]) -
                      transform.transform[2],
                  y:
                      (anchorPoint.y - transform.transform[1]) *
                          (1 / transform.transform[2]) -
                      transform.transform[2],
              }
        setNodes((elements) => {
            const nextId = getId(elements)
            return [
                ...elements,
                {
                    id: nextId,
                    type: "divideNode",
                    data: {
                        setResult: (res) => onInputNodeUpdate(res, nextId),
                    },
                    position: position,
                },
            ]
        })
    }, [anchorPoint, transform.transform])

    const addAddNode = useCallback(() => {
        const rect = document
            .getElementsByClassName("react-flow")[0]
            .getBoundingClientRect()
        const position = isMobile
            ? {
                  x: rect.width / 2 - 75,
                  y: rect.height / 2,
              }
            : {
                  x:
                      (anchorPoint.x - transform.transform[0]) *
                          (1 / transform.transform[2]) -
                      transform.transform[2],
                  y:
                      (anchorPoint.y - transform.transform[1]) *
                          (1 / transform.transform[2]) -
                      transform.transform[2],
              }
        setNodes((elements) => {
            const nextId = getId(elements)
            return [
                ...elements,
                {
                    id: nextId,
                    type: "addNode",
                    data: {
                        setResult: (res) => onInputNodeUpdate(res, nextId),
                    },
                    position: position,
                },
            ]
        })
    }, [anchorPoint, transform.transform])

    const addFilterNode = (filterType) => {
        const rect = document
            .getElementsByClassName("react-flow")[0]
            .getBoundingClientRect()
        const position = isMobile
            ? {
                  x: rect.width / 2 - 75,
                  y: rect.height / 2,
              }
            : {
                  x:
                      (anchorPoint.x - transform.transform[0]) *
                          (1 / transform.transform[2]) -
                      transform.transform[2],
                  y:
                      (anchorPoint.y - transform.transform[1]) *
                          (1 / transform.transform[2]) -
                      transform.transform[2],
              }

        switch (filterType) {
            case "eq":
                setNodes((elements) => {
                    const nextId = getId(elements)
                    return [
                        ...elements,
                        {
                            id: nextId,
                            type: "filterNode",
                            data: {
                                type: "eq",
                                setResult: (res) =>
                                    onInputNodeUpdate(res, nextId),
                            },
                            position: position,
                        },
                    ]
                })
                break
            case "gt":
                setNodes((elements) => {
                    const nextId = getId(elements)
                    return [
                        ...elements,
                        {
                            id: nextId,
                            type: "filterNode",
                            data: {
                                type: "gt",
                                setResult: (res) =>
                                    onInputNodeUpdate(res, nextId),
                            },
                            position: position,
                        },
                    ]
                })
                break
            case "lt":
                setNodes((elements) => {
                    const nextId = getId(elements)
                    return [
                        ...elements,
                        {
                            id: nextId,
                            type: "filterNode",
                            data: {
                                type: "lt",
                                setResult: (res) =>
                                    onInputNodeUpdate(res, nextId),
                            },
                            position: position,
                        },
                    ]
                })
                break
        }
    }

    const addApiOutputNode = useCallback(() => {
        const rect = document
            .getElementsByClassName("react-flow")[0]
            .getBoundingClientRect()
        const position = isMobile
            ? {
                  x: rect.width / 2 - 75,
                  y: rect.height / 2,
              }
            : {
                  x:
                      (anchorPoint.x - transform.transform[0]) *
                          (1 / transform.transform[2]) -
                      transform.transform[2],
                  y:
                      (anchorPoint.y - transform.transform[1]) *
                          (1 / transform.transform[2]) -
                      transform.transform[2],
              }
        setNodes((elements) => {
            const nextId = getId(elements)
            return [
                ...elements,
                {
                    id: nextId,
                    type: "apiOutputNode",
                    data: {},
                    position: position,
                },
            ]
        })
    }, [anchorPoint, transform.transform])

    const addAirTableNode = useCallback(() => {
        const rect = document
            .getElementsByClassName("react-flow")[0]
            .getBoundingClientRect()
        const position = isMobile
            ? {
                  x: rect.width / 2 - 75,
                  y: rect.height / 2,
              }
            : {
                  x:
                      (anchorPoint.x - transform.transform[0]) *
                          (1 / transform.transform[2]) -
                      transform.transform[2],
                  y:
                      (anchorPoint.y - transform.transform[1]) *
                          (1 / transform.transform[2]) -
                      transform.transform[2],
              }
        setNodes((elements) => {
            const nextId = getId(elements)
            return [
                ...elements,
                {
                    id: nextId,
                    type: "airTableNode",
                    data: {
                        setResult: (res) => onInputNodeUpdate(res, nextId),
                    },
                    position: position,
                },
            ]
        })
    }, [anchorPoint, transform.transform])

    const menus = useMemo(() => {
        return {
            general: (
                <ul
                    className="menu"
                    style={{
                        top: anchorPoint.y,
                        left: anchorPoint.x,
                    }}
                >
                    <li className="menu-title"> Add Node </li>
                    <li className="menu-title">----</li>
                    <li className="menu-item" onClick={addOutputNode}>
                        Output Node
                    </li>
                    <li className="menu-item" onClick={addInputNode}>
                        Input Node
                    </li>
                    <li
                        className="menu-item"
                        onClick={(e) => {
                            e.stopPropagation()
                            setmenuSection("conditional")
                        }}
                    >
                        Conditional Nodes {" >"}
                    </li>
                    <li
                        className="menu-item"
                        onClick={(e) => {
                            e.stopPropagation()
                            setmenuSection("filter")
                        }}
                    >
                        Add Filter {" >"}
                    </li>

                    <li
                        className="menu-item"
                        onClick={(e) => {
                            e.stopPropagation()
                            setmenuSection("API")
                        }}
                    >
                        API {" >"}
                    </li>

                    <li
                        className="menu-item"
                        onClick={(e) => {
                            e.stopPropagation()
                            setmenuSection("operations")
                        }}
                    >
                        Operations {" >"}
                    </li>
                </ul>
            ),
            conditional: (
                <ul
                    className="menu"
                    style={{
                        top: anchorPoint.y,
                        left: anchorPoint.x,
                    }}
                >
                    <li className="menu-title"> Conditional </li>
                    <li className="menu-title">----</li>
                    <li className="menu-item" onClick={addBooleanNode}>
                        Boolean Node
                    </li>
                    <li className="menu-item" onClick={addToggleNode}>
                        Toggle Node
                    </li>
                    <li className="menu-item" onClick={addIsValueNode}>
                        Equals to Value
                    </li>
                </ul>
            ),
            API: (
                <ul
                    className="menu"
                    style={{
                        top: anchorPoint.y,
                        left: anchorPoint.x,
                    }}
                >
                    <li className="menu-title"> API Nodes</li>
                    <li className="menu-title">----</li>
                    <li className="menu-item" onClick={addSupabaseFetchNode}>
                        Supabase Node
                    </li>
                    <li className="menu-item" onClick={addAirTableNode}>
                        AirTable Node
                    </li>
                    <li className="menu-item" onClick={addSelectTableNode}>
                        Select Table
                    </li>
                    <li className="menu-item" onClick={addApiOutputNode}>
                        Api Output Node
                    </li>
                </ul>
            ),
            operations: (
                <ul
                    className="menu"
                    style={{
                        top: anchorPoint.y,
                        left: anchorPoint.x,
                    }}
                >
                    <li className="menu-title"> Operation Nodes</li>
                    <li className="menu-title">----</li>
                    <li className="menu-item" onClick={addAddNode}>
                        Add Values Node
                    </li>
                    <li className="menu-item" onClick={addMultiplyNode}>
                        Multiply Values Node
                    </li>
                    <li className="menu-item" onClick={addDivideNode}>
                        Divide Values Node
                    </li>
                    <li className="menu-item" onClick={addPowerNode}>
                        Power Node
                    </li>
                </ul>
            ),

            filter: (
                <ul
                    className="menu"
                    style={{
                        top: anchorPoint.y,
                        left: anchorPoint.x,
                    }}
                >
                    <li className="menu-title"> Add filter</li>
                    <li className="menu-title">----</li>
                    <li
                        className="menu-item"
                        onClick={() => addFilterNode("eq")}
                    >
                        Equal
                    </li>
                    <li
                        className="menu-item"
                        onClick={() => addFilterNode("gt")}
                    >
                        Greater then{" "}
                    </li>
                    <li
                        className="menu-item"
                        onClick={() => addFilterNode("lt")}
                    >
                        Less than{" "}
                    </li>
                </ul>
            ),
        }
    }, [])

    return menus[menuSection]
}
