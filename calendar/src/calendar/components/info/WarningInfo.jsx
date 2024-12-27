import React from "react";
import { CiWarning } from "react-icons/ci";

const WarningInfo = ({ message }) => {
  return (
    message && (
      <div className="bg-[#1acb97]/[.1] rounded-lg flex gap-2 p-2 items-center text-[#1acb97]">
        <CiWarning className="text-xl " />
        <p>{message ? message : "error"}</p>
      </div>
    )
  );
};

export default WarningInfo;
