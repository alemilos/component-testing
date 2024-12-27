import React from "react";
import { CiWarning } from "react-icons/ci";

const ErrorInfo = ({ message }) => {
  return (
    message && (
      <div className="bg-[#f00]/[.1] rounded-lg flex gap-2 p-2 items-center text-[#f00]">
        <CiWarning className="text-xl " />
        <p>{message ? message : "error"}</p>
      </div>
    )
  );
};

export default ErrorInfo;
