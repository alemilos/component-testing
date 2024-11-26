import { SyntheticEvent, useEffect, useReducer, useState } from "react";
import Dygraph from "dygraphs";

const dygraphId = "graphdiv";

function iModelReducer(state: any, action: any) {
  switch (action.type) {
    case "pan":
      return { model: "pan" };

    case "zoomIn":
      return { model: "zoomIn" };

    case "zoomOut":
      return { model: "zoomOut" };

    case "select":
      return { model: "select" };

    default:
      throw new Error("Invalid action type");
  }
}

const initialIModel = {
  model: null,
};

function App() {
  const [dygraphs, setDygraphs] = useState(null);

  const [iModel, dispatchIModel] = useReducer(iModelReducer, initialIModel);

  const data = [
    [1, 10, 100],
    [2, 20, 80],
    [3, 50, 60],
    [4, 70, 80],
    [5, 70, 80],
    [6, 70, 80],
    [7, 70, 80],
    [8, 70, 80],
  ];

  const options = {
    interactionModel: {},
  };

  useEffect(() => {
    const dygraphInstance: Dygraph = new Dygraph(dygraphId, data, options);
    setDygraphs(dygraphInstance);
  }, []);

  function handleSelectChange(e: any) {
    dispatchIModel({ type: e.target.value });
  }

  return (
    <div className="w-screen h-screen flex flex-col gap-16 items-center justify-center">
      {/* Interaction model selector */}
      <div className="flex gap-6 p-4 bg-[#1f1f1f] text-white rounded-md items-center justify-center">
        <p>Select an interaction model for dygraphs</p>

        <select
          onChange={handleSelectChange}
          className="px-4 py-2 bg-[#8f8f8f] rounded-md"
        >
          <option value="pan">Pan</option>
          <option value="zoomIn">Zoom In</option>
          <option value="zoomOut">Zoom Out</option>
          <option value="select">Select</option>
        </select>
      </div>

      <div id={dygraphId}></div>
    </div>
  );
}

export default App;
