import ClipLoader from "react-spinners/ClipLoader";

import React from "react";

const CircleSpinner = ({ color, loading, size = 20 }) => {
  return (
    <ClipLoader
      color={color}
      loading={loading}
      className="block mx-auto h-full"
      size={size}
    />
  );
};

export default CircleSpinner;
