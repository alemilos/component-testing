import React from "react";
import { useCalendar } from "../../../Provider";

const InvalidEventEdit = ({ type }) => {
  const { user } = useCalendar();

  let titleText, infoText;
  switch (type) {
    case "drop":
      if (user === "coach") {
        titleText = "Cannot place blocking here";
        infoText = "The day or time you tried to place the blocking is invalid";
      } else if (user === "coachee") {
        titleText = "Cannot drop booking here";
        infoText = "The day or time you tried to place the booking is invalid";
      }
      break;
    case "resize":
      if (user === "coach") {
        titleText = "Cannot resize blocking";
        infoText = "The resizement has conflicts with other events";
      } else if (user === "coachee") {
        titleText = "Cannot resize booking";
        infoText = "The booking can either be 45 or 60 minutes";
      }
      break;
    default:
      throw new Error("invalid event edit type");
  }

  return (
    <div className="bg-white rounded-lg py-2 pb-4 px-[36px] w-[580px] max-h-[500px] overflow-scroll text-lg">
      <div className="p-3 font-bold flex border-b">
        <p className="text-[24px] text-left">{titleText}</p>
      </div>
      <p className="pt-3 text-lg text-[#979797] font-500">{infoText}</p>
    </div>
  );
};

export default InvalidEventEdit;
