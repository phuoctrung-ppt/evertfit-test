import { useEffect, useState } from "react";
import type { Workout as WorkoutType } from "../interfaces";
import { Workout } from "./Workout";
import { DragAndDrop } from "./DragAndDrop";

interface IDayProps {
  date: string;
  workouts?: WorkoutType[];
}

export const Day = ({ date, workouts }: IDayProps) => {
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
    console.log("🚀 ~ handleDrop ~ updatedWorkouts:", updatedWorkouts);
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
      <DragAndDrop
        items={dayWorkouts}
        renderItem={(workout, index, isDragging) => (
          <Workout key={workout.id} {...workout} isDragging={isDragging} />
        )}
        onDrop={handleDrop}
      />
    </div>
  );
};
