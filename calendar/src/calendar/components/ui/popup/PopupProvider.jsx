import { createContext, useContext, useState } from "react";

const PopupContext = createContext();

/**
 * Store or Provider for a popup.
 * @param {*} param0
 * @returns
 */
const PopupProvider = ({ children }) => {
  const [popup, setPopup] = useState(null);

  /**
   * Open the PopupComponent passed in.
   * Props and onClose parameters are not mandatory.
   * @param {*} PopupComponent The Functional React Component
   * @param {*} props Props to be passed in PopupComponent (default: {})
   * @param {*} onClose A function to call when popup is closed (default: () => {})
   */
  function openPopup(PopupComponent, { props = {}, onClose = () => {} } = {}) {
    console.log(props);
    setPopup({ PopupComponent, onClose, props });
  }

  function closePopup() {
    popup.onClose();
    setPopup(null);
  }

  return (
    <PopupContext.Provider value={{ openPopup, closePopup }}>
      {children}
      {popup?.PopupComponent && (
        <div className="popup-overlay" onClick={closePopup}>
          <div onClick={(e) => e.stopPropagation()}>
            <popup.PopupComponent {...popup.props} />
          </div>
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
