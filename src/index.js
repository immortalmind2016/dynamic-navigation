import { render } from "react-dom";
// import Example from "./example";
import { Main as Example } from "./nav/Main";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./index.css";
function App() {
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <Example root={1} />
      </DndProvider>
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
