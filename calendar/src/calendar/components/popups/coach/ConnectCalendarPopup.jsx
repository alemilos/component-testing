import React, { useState } from "react";
import { usePopup } from "../../ui/popup/PopupProvider";

import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { useCalendar } from "../../../Provider";

const ConnectCalendarPopup = () => {
  const [loading, setLoading] = useState(false);

  const { syncWithGoogle, syncWithApple } = useCalendar();

  async function handleGoogleClick() {
    if (confirm("Want to sync with google calendar ?")) {
      setLoading(true);
      await syncWithGoogle();
      setLoading(false);
    }
  }
  async function handleAppleClick() {
    if (confirm("Want to sync with apple calendar ?")) {
      setLoading(true);
      await syncWithApple();
      setLoading(false);
    }
  }

  return (
    <div className="bg-white py-4 px-12 flex flex-col gap-4 rounded-lg items-center">
      <div className="flex gap-8">
        <FcGoogle
          className="text-6xl cursor-pointer"
          onClick={handleGoogleClick}
        />
        <FaApple
          className="text-6xl cursor-pointer"
          onClick={handleAppleClick}
        />
      </div>

      {loading && "loading..."}
    </div>
  );
};

export default ConnectCalendarPopup;
