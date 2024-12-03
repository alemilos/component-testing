import CalendarProvider from "./Provider";

const CalendarConsumer = () => {
  return <div className=""></div>;
};

const Calendar = () => {
  return (
    <CalendarProvider>
      <CalendarConsumer />
    </CalendarProvider>
  );
};

export default Calendar;
