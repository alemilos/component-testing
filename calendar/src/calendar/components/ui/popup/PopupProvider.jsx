import { createContext, useContext, useState } from "react";

const PopupContext = createContext();

/**
 * Store or Provider for a popup.
 * @param {*} param0
 * @returns
 */
const PopupProvider = ({ children }) => {
  function open(PopupComponent) {}

  function close() {
    setIsOpen(false);
  }

  return (
    <PopupContext.Provider value={{ close }}>{children}</PopupContext.Provider>
  );
};

export default PopupProvider;

export function usePopup() {
  const context = useContext(PopupContext);
  if (!context) throw new Error("usePopup must be used within PopupProvider");
  return context;
}
