import React from "react"
import { Link } from "react-router-dom"
import {Draggable} from '../draggable'
const DndSidebar = () => {
  return (
    <div className="text-white h-screen bg-blue-900/70 border border-blue-100 p-6 w-1/5 shadow-2xl h-screen rounded m-1">
      <h1 className="text-xl text-white mb-4 border-2 border-white border-b-white-500 border-t-0 border-l-0 border-r-0">Components</h1>
        <Draggable/>
    </div>
  )
}

export default DndSidebar