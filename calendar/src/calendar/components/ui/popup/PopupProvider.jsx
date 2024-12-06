import { createContext, createElement, useContext, useState } from "react";

const PopupContext = createContext();

/**
 * Store or Provider for a popup.
 * @param {*} param0
 * @returns
 */
const PopupProvider = ({ children }) => {
  const [PopupComponent, setPopupComponent] = useState(null);
  const [popupProps, setPopupProps] = useState(null);

  function openPopup(PopupComponent, props) {
    setPopupComponent(() => PopupComponent);
    setPopupProps(props);
  }

  function closePopup() {
    setPopupComponent(null);
    setPopupProps(null);
  }

  return (
    <PopupContext.Provider value={{ openPopup, closePopup }}>
      {children}
      {PopupComponent && (
        <div className="popup-overlay" onClick={closePopup}>
          <PopupComponent {...popupProps} />
          {/* {createElement(PopupComponent, popupProps)} */}
        </div>
      )}
    </PopupContext.Provider>
  );
};

export default PopupProvider;

export function usePopup() {
  const context = useContext(PopupContext);
  if (!context) throw new Error("usePopup must be used within PopupProvider");
  return context;
}
