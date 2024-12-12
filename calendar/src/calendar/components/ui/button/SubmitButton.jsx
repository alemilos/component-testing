import React from "react";
import CircleSpinner from "../spinner/CircleSpinner";

const SubmitButton = ({ onClick, text, loading }) => {
  return (
    <button
      onClick={onClick}
      className="py-2 w-20 h-11 rounded-[12px] bg-[#1acb97] text-white flex items-center justify-center"
    >
      {!loading ? text : <CircleSpinner color="white" />}
    </button>
  );
};

export default SubmitButton;
