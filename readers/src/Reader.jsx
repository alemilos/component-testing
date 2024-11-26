import React from "react";

const Reader = ({ file }) => {
  const fileType = file.type.includes("epub") ? "epub" : "pdf";

  return (
    <div className="">
      {fileType === "epub" ? <EpubReader /> : <PdfReader />}
    </div>
  );
};

const EpubReader = () => {};
const PdfReader = () => {};

export default Reader;
