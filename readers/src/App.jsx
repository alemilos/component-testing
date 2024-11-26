import { useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Reader from "./Reader";

function App() {
  const [file, setFile] = useState(null);
  const acceptedTypes = ["application/epub+zip", "application/pdf"];

  function handleFileInput(e) {
    const file = e.target.files[0];

    if (!acceptedTypes.includes(file.type)) {
      toast.error("Invalid file type");
    } else {
      setFile(file);
    }
  }

  return (
    <div className="w-screen h-screen bg-[#1f1f1f] flex flex-col gap-8 items-center justify-center">
      {!file ? (
        <>
          <p className="text-3xl text-white"> Select a book</p>
          <input
            type="file"
            className="text-white"
            onChange={handleFileInput}
          />
        </>
      ) : (
        <Reader file={file} />
      )}

      <ToastContainer />
    </div>
  );
}

export default App;
