import { useState } from "react"
import { motion } from "framer-motion"
import { addPropertyControls, ControlType } from "framer"

import { remapNodeData } from "./NodeUtils.tsx"

// Welcome to Code in Framer
// Get Started: https://www.framer.com/docs/guides/

/**
 * These annotations control how your component sizes
 * Learn more: https://www.framer.com/docs/guides/auto-sizing
 *
 * @framerSupportedLayoutWidth any
 * @framerSupportedLayoutHeight any
 */
export default function NodeContextMenu({
    node,
    setNodes,
    anchorPoint,
    setEdges,
}) {
    const deleteNode = () => {
        setNodes((elements) => {
            const newNodes = elements.filter((el) => el.id !== node.id)
            setEdges((edgs) => {
                if (edgs.length === 0) return edgs
                const newEdges = edgs.filter(
                    (edg) => !(edg.source === node.id || edg.target === node.id)
                )
                remapNodeData(newEdges, newNodes, setNodes, edgs)
                return newEdges
            })
            console.log(newNodes)
            return newNodes
        })
    }

    const setNodeColor = (color) => {
        setNodes((elements) => {
            const newNodes = elements.map((el) => {
                if (el.id === node.id) {
                    el.data = {
                        ...el.data,
                        color: color,
                    }
                }
                return el
            })
            setEdges((edgs) => {
                remapNodeData(edgs, newNodes, setNodes, undefined)
                return edgs
            })
            return newNodes
        })
    }
    return (
        <ul
            className="menu"
            style={{
                top: anchorPoint.y,
                left: anchorPoint.x,
            }}
        >
            <li className="menu-title" onClick={deleteNode}>
                Delete
            </li>
            <li className="menu-title colors">
                <div
                    className="white"
                    onClick={() => {
                        setNodeColor("white")
                    }}
                />

                <div
                    className="red"
                    onClick={() => {
                        setNodeColor("red")
                    }}
                />
                <div
                    className="blue"
                    onClick={() => {
                        setNodeColor("blue")
                    }}
                />
                <div
                    className="green"
                    onClick={() => {
                        setNodeColor("green")
                    }}
                />
            </li>
        </ul>
    )
}
