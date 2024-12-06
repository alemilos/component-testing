import React from "react";
import { usePopup } from "../ui/popup/PopupProvider";

/**
 * Should be used when adding a new event or when editing an existing one.
 * @returns
 */
const CustomizeEventPopup = () => {
  const { closePopup } = usePopup();

  return (
    <div className="bg-[red]">
      Customize Event Popup
      <button onClick={closePopup}>chiudimi</button>
    </div>
  );
};

export default CustomizeEventPopup;
