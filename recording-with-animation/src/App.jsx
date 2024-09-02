import { useEffect, useState } from "react";

function App() {
  const [clicked, setClicked] = useState(false);
  const [recording, setRecording] = useState(false);
  const [hover, setHover] = useState(false);

  function onMouseEnter() {
    if (!recording) {
      setHover(true);
    }
  }
  function onMouseLeave() {
    setHover(false);
  }

  function handleMouseDown() {
    if (!recording) {
      setClicked(true);
    }
  }

  function handleMouseUp() {
    if (!recording) {
      setClicked(false);
    }
  }

  function handleClick() {
    if (!recording) {
      setRecording(true);
    }
  }

  let interval1;
  let interval2;

  useEffect(() => {
    if (recording) {
      setClicked(true);

      interval1 = setInterval(() => {
        setClicked(false);
      }, 1000);

      interval2 = setInterval(() => {
        setClicked(true);
      }, 2000);

      setTimeout(() => {
        setRecording(false);
      }, 10000);
    }

    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
    };
  }, [recording]);

  return (
    <div className="bg-primary w-screen h-screen flex items-center justify-center">
      <div
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={handleClick}
        className={`w-32 h-32 rounded-full flex items-center justify-center ${
          clicked ? "bg-redLight" : "bg-redLight10"
        }`}
      >
        <div
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className={`rounded-full w-[90%] h-[90%] flex items-center justify-center border border-4 border-primary cursor-pointer ${
            clicked ? "bg-redLight" : "bg-redLight10"
          } ${hover ? "bg-redLight40" : ""}`}
        >
          <p className="font-bold text-2xl text-white">REC</p>
        </div>
      </div>
    </div>
  );
}

export default App;
