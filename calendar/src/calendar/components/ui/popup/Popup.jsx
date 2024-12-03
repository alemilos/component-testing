import React from "react";
import PopupProvider from "./PopupProvider";

/**
 * Popup Wrapper component
 * @param {*} param0
 * @returns
 */
const Popup = ({ children }) => {
  return <PopupProvider>{children}</PopupProvider>;
};

export default Popup;
