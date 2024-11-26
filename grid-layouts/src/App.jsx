import { useState } from "react";

function App() {
  const items = [0, 0, 0, 0];

  return (
    <div className="h-screen w-screen bg-black">
      <div className="px-32 w-full h-full grid grid-cols-test">
        {items.map((item) => {
          return (
            <div className="min-w-64 min-h-32 h-32 w-64 bg-[red] border"></div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
