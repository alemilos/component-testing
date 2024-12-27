export const utils = {
  monthsLong: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  monthsShort: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],

  hourSlots: [
    "00:00",
    "00:30",
    "01:00",
    "01:30",
    "02:00",
    "02:30",
    "03:00",
    "03:30",
    "04:00",
    "04:30",
    "05:00",
    "05:30",
    "06:00",
    "06:30",
    "07:00",
    "07:30",
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00",
    "22:30",
    "23:00",
    "23:30",
  ],

  /**
   * Get hours minutes in the format HH:mm from a Date
   * @param {Date} date
   * @returns
   */
  formatHoursMinutes(date) {
    return Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(date);
  },

  /**
   * Change the time in a given Date
   * @param {Date} date
   * @param {string} time
   * @returns
   */
  changeDateTime(date, time) {
    const [hour, minute] = time.split(":").map(Number);
    return new Date(date.setHours(hour, minute, 0));
  },

  /**
   * Format a date in the format YYYY-MM-dd
   * @param {Date} date
   * @returns
   */
  formatYearMonthDay(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  },

  /**
   * Calculate duration in HH:mm between HH:mm, HH:mm formatted times
   * @param {string} start
   * @param {string} end
   * @returns
   */
  calcDuration(start, end) {
    const [startHour, startMin] = start.split(":");
    const [endHour, endMin] = end.split(":");

    let diffHour = parseInt(endHour) - parseInt(startHour);
    let diffMin = parseInt(endMin) - parseInt(startMin);

    if (diffHour < 10) diffHour = "0" + diffHour;
    if (diffMin < 10) diffMin = "0" + diffMin;

    return `${diffHour}:${diffMin}`;
  },

  weeksCount(value, unit) {
    let weeks;
    if (unit === "weeks") weeks = value;
    else if (unit === "months") weeks = value * 4;
    else if (unit === "years") weeks = value * 52;
    return weeks;
  },

  /**
   * Convert a formatted duration such as HH:mm to an integer of minutes
   * @param {string} duration
   */
  hoursMinutesFormatToMinutes(duration) {
    const [hours, minutes] = duration.split(":");
    return parseInt(hours) * 60 + parseInt(minutes);
  },

  /**
   * Check if 2 dates are the same day and in case they are not, check if their difference is 24h
   * and both set at 00:00
   * @param {Date} date1
   * @param {Date} date2
   * @returns
   */
  isSameDay(date1, date2) {
    const sameYear = date1.getFullYear() === date2.getFullYear();
    const sameMonth = date1.getMonth() === date2.getMonth();
    const sameDay = date1.getDate() === date2.getDate();
    let bothMidnights, oneDayDiff;

    // Ensure both times are at 00:00
    if (
      date1.getHours() === 0 &&
      date1.getMinutes() === 0 &&
      date1.getSeconds() === 0 &&
      date2.getHours() === 0 &&
      date2.getMinutes() === 0 &&
      date2.getSeconds() === 0
    ) {
      bothMidnights = true;
    }

    // Calculate the difference in milliseconds
    const difference = Math.abs(date1 - date2);
    // Check if the difference is exactly 24 hours in milliseconds
    oneDayDiff = difference === 24 * 60 * 60 * 1000; // 24 hours * 60 minutes * 60 seconds * 1000 ms

    if (sameYear && sameMonth && sameDay) return true;
    if (sameYear && sameMonth && oneDayDiff && bothMidnights) return true;

    return false;
  },
};
