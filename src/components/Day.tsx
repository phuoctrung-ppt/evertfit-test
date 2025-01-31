import { useEffect, useState } from "react";
import type { Workout as WorkoutType } from "../interfaces";
import { Workout } from "./Workout";
import { DragAndDrop } from "./DragAndDrop";
import { Add } from "../assets/icons/Add";

interface IDayProps {
  date: string;
  workouts?: WorkoutType[];
  callback?: () => void;
}

export const Day = ({ date, workouts, callback }: IDayProps) => {
  const [currentDay, setCurrentDay] = useState<string>("");
  const [dayWorkouts, setDayWorkouts] = useState<WorkoutType[]>(workouts || []);

  useEffect(() => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    setCurrentDay(day);
  }, []);

  useEffect(() => {
    setDayWorkouts(workouts || []);
  }, [workouts]);

  const handleDrop = (updatedWorkouts: WorkoutType[]) => {
    setDayWorkouts(updatedWorkouts);
  };

  return (
    <div className="p-[7px]">
      <h3
        className={`text-left text-[11px] font-semibold ${
          currentDay === date ? "text-[#5A57CB]" : "text-[#728096]"
        } `}>
        {date}
      </h3>
      <div className="flex item-center justify-end py-1 cursor-pointer">
        <Add />
      </div>
      <DragAndDrop
        items={dayWorkouts}
        renderItem={(workout, index, isDragging) => (
          <Workout
            callback={callback}
            date={date}
            key={workout.id}
            {...workout}
            isDragging={isDragging}
          />
        )}
        onDrop={handleDrop}
      />
    </div>
  );
};
