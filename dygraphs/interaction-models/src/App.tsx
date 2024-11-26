import { SyntheticEvent, useEffect, useReducer, useState } from "react";
import Dygraph from "dygraphs";
import { DygraphInteraction } from "./interactions.js";

const dygraphId = "graphdiv";

function iModelReducer(state: any, action: any) {
  switch (action.type) {
    case "pan":
      return {
        model: {
          // Reset zoom
          dblclick: function (event, g, context) {
            Dygraph.defaultInteractionModel.dblclick(event, g, context);
          },
          mousedown: function (event, g, context) {
            DygraphInteraction.startPan(event, g, context);
          },
          touchend: function (event, g, context) {},
          touchmove: function (event, g, context) {},
          touchstart: function (event, g, context) {},
          willDestroyContextMyself: true,
        },
      };

    case "zoomIn":
      return { model: "zoomIn" };

    case "zoomOut":
      return { model: "zoomOut" };

    case "selectArea":
      return { model: "selectArea" };

    case "none":
      return { model: {} }; // empty model

    case "default":
      return {
        model: {
          dblclick: function (event, g, context) {
            console.log("dblclick");
            Dygraph.defaultInteractionModel.dblclick(event, g, context);
          },
          mousedown: function (event, g, context) {
            console.log("mouse down");
            Dygraph.defaultInteractionModel.mousedown(event, g, context);
          },
          willDestroyContextMyself: true,
        },
      };

    default:
      throw new Error("Invalid action type");
  }
}

const initialIModel = {
  model: {},
};

function App() {
  const [dygraph, setDygraph] = useState<Dygraph>(null);
  const [loading, setLoading] = useState(false);

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
    interactionModel: iModel.model,
  };

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      const dygraphInstance = new Dygraph(dygraphId, data, options);
      setDygraph(dygraphInstance);

      setLoading(false);
    }, 2000);
  }, []);

  function handleSelectChange(e: any) {
    dispatchIModel({ type: e.target.value });
  }

  // Recreate dygraph on interaction model change
  useEffect(() => {
    if (dygraph) {
      dygraph.destroy();
    }

    setDygraph(new Dygraph(dygraphId, data, options));
  }, [iModel]);

  return (
    <div className="w-screen h-screen flex flex-col gap-16 items-center justify-center">
      {/* Interaction model selector */}
      <div className="flex gap-6 p-4 bg-[#1f1f1f] text-white rounded-md items-center justify-center">
        <p>Select an interaction model for dygraphs</p>

        <select
          onChange={handleSelectChange}
          className="px-4 py-2 bg-[#8f8f8f] rounded-md"
        >
          <option value="none">None</option>
          <option value="pan">Pan</option>
          <option value="zoomIn">Zoom In</option>
          <option value="zoomOut">Zoom Out</option>
          <option value="selectArea">Select Area</option>
          <option value="default">Default</option>
        </select>
      </div>

      <div id={dygraphId}></div>
      {loading && "Loading chart..."}
    </div>
  );
}

export default App;
