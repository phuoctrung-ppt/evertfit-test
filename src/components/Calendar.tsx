import { useEffect, useState } from "react";
import { DAY } from "../constants";
import { WorkoutDayResponse } from "../interfaces";
import { getWorkoutCalender } from "../services";
import { getCurrentDateForDay } from "../utils";
import { Day } from "./Day";

const getWorkoutsByDay = (days: WorkoutDayResponse[]) => {
  return days.reduce((acc, day) => {
    acc[day.date] = day.workouts || [];
    return acc;
  }, {} as { [key: string]: WorkoutDayResponse["workouts"] });
};

export const Calendar = () => {
  const [days, setDays] = useState<WorkoutDayResponse[]>([]);

  const workoutsByDay = getWorkoutsByDay(days);

  useEffect(() => {
    if (!days.length) {
      fetchWorkouts();
    }
  }, []);

  const fetchWorkouts = async () => {
    const { data } = await getWorkoutCalender();
    if (data) {
      setDays(data);
    }
  };

  return (
    <div className="grid grid-cols-7 gap-2.5 bg-gray-30 h-screen p-5">
      {Object.entries(DAY).map(([key, value]) => {
        const date = getCurrentDateForDay(value).toString();
        return (
          <div key={`${value}-${key}`} className="flex flex-col">
            <p className="mb-[9px] uppercase text-[10px] font-[600] leading-[13.62px] text-[#6A7988]">
              {value}
            </p>
            <div className="flex flex-col min-w-[179px] bg-[#F3F5F8] border border-[#F3F5F8] rounded-[6px] h-full">
              <Day
                key={`${value}-${key}`}
                date={date}
                workouts={workoutsByDay[date] || []}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
