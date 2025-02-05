import { DAY } from "../constants";
const getCurrentDateForDay = (day: DAY) => {
  const today = new Date();
  const dayIndex = Object.values(DAY).indexOf(day);
  const startOfWeek = new Date(
    today.setDate(today.getDate() - today.getDay() + 1)
  );
  const dayDate = new Date(
    startOfWeek.setDate(startOfWeek.getDate() + dayIndex)
  );
  const dayDateDD = dayDate.getDate();
  return dayDateDD.toString().padStart(2, "0");
};
export { getCurrentDateForDay };
