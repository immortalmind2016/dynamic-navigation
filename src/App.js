import logo from "./logo.svg";
import "./App.css";
import { useDrag, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Bucket from "./Bucket";
import React from "react";
function App() {
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    // "type" is required. It is used by the "accept" specification of drop targets.
    type: "BOX",
    // The collect function utilizes a "monitor" instance (see the Overview for what this is)
    // to pull important pieces of state from the DnD system.
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  return (
    <div>
      <div ref={dragPreview} style={{ opacity: isDragging ? 0.5 : 1 }}>
        <div role="Handle" ref={drag}>
          DRaggable
        </div>
      </div>
      <Bucket></Bucket>
    </div>
  );
}

export default App;
