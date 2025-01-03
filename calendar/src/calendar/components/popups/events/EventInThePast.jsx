import { PiWarningFill } from "react-icons/pi";
import { IoMdClose } from "react-icons/io";
import { usePopup } from "../../ui/popup/PopupProvider";
import { useCalendar } from "../../../Provider";

const EventInThePast = () => {
  const { user } = useCalendar();
  const { closePopup } = usePopup();

  let text;
  if (user === "coach")
    text = "Slots in the past are not allowed to be blocked";
  else if (user === "coachee")
    text = "Slots in the past are not available for booking";

  return (
    <div className="bg-white rounded-lg pl-6 pr-2 pt-2 pb-4 flex flex-col gap-2">
      <IoMdClose
        className="text-xl self-end cursor-pointer"
        onClick={closePopup}
      />
      <div className="flex gap-4 items-center justify-center pr-10">
        <PiWarningFill className="text-2xl " />
        <p className="w-72 font-bold">{text}</p>
      </div>
    </div>
  );
};
export default EventInThePast;
