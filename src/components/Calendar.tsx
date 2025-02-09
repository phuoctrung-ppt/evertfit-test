import { useEffect, useState } from "react";
import { DAY } from "../constants";
import { Workout, WorkoutDayResponse } from "../interfaces";
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

  const handleMoveWorkout = (
    workoutId: string,
    fromDate: string,
    toDate: string
  ) => {
    const dataCloned = [...days];
    let movedWorkout: Workout | undefined;

    const fromDay = dataCloned.find((day) => day.date === fromDate);
    if (fromDay) {
      movedWorkout = fromDay.workouts?.find(
        (workout) => workout.id === workoutId
      );
      fromDay.workouts = fromDay.workouts?.filter(
        (workout) => workout.id !== workoutId
      );
    }

    const toDay = dataCloned.find((day) => day.date === toDate);
    if (toDay && movedWorkout) {
      toDay.workouts = toDay.workouts
        ? [...toDay.workouts, movedWorkout]
        : [movedWorkout];
    }

    setDays(dataCloned);
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
            <div
              onDrop={(e) => {
                const workout = JSON.parse(e.dataTransfer.getData("workout"));
                handleMoveWorkout(workout.id, workout.date, date);
              }}
              onDragOver={(e) => e.preventDefault()}
              className="flex flex-col min-w-[179px] bg-[#F3F5F8] border border-[#F3F5F8] rounded-[6px] h-full">
              <Day
                callback={fetchWorkouts}
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
