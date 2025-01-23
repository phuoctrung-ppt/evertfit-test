import { useState } from "react";
import { Add } from "../assets/icons/Add";
import { MoreField } from "../assets/icons/MoreFiled";
import { Exercise } from "../interfaces";
import CreateWorkout from "../modules/create-workout";
import Modal from "./Modal";

interface IWorkoutProps {
  title: string;
  exercises: Exercise[];
  isDragging?: boolean;
}

export const Workout = ({ title, exercises, isDragging }: IWorkoutProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className={`bg-[#FFFFFFCC] border mb-[6px] border-[#22242626] rounded-[7px] px-[7px] py-[5px] grid gap-[5px] ${
          isDragging ? "opacity-50" : ""
        } cursor-move`}>
        <div className="flex justify-between items-center">
          <h4 className="uppercase max-w-[140px] overflow-hidden text-nowrap text-ellipsis font-bold text-[10px] text-[#5A57CB] leading-[13.6px]">
            {title}
          </h4>
          <div>
            <MoreField />
          </div>
        </div>
        {exercises.map((exercise, index) => (
          <div
            key={`${exercise.name}-${index}`}
            className="flex flex-row-reverse items-end justify-between bg-[#FFFFFF] border border-[#DFDFDF] rounded-[3px] px-[8px] py-[5px]">
            <div className="flex flex-col">
              <p className="text-right uppercase max-w-[120px] overflow-hidden text-nowrap text-ellipsis font-[600] text-[13px] leading-[17.7px]">
                {exercise.name}
              </p>
              <p className="text-[10px] leading-[13.62px] max-w-[115px] overflow-hidden text-nowrap text-ellipsis text-[#95A6B7] text-rightr">
                {exercise.weight &&
                  exercise.reps &&
                  exercise.weight
                    .map((w, i) => `${w} lb x ${exercise.reps?.[i]}`)
                    .join(", ")}
              </p>
            </div>
            <p className="font-bold text-[10px] leading-[13.62px] text-right text-[#919CAD]">
              {exercise.sets} x
            </p>
          </div>
        ))}
        <button
          className="cursor-pointer w-full flex justify-end"
          onClick={() => setOpen(!open)}>
          <Add />
        </button>
      </div>
      <Modal
        isOpen={open}
        onClose={() => setOpen(!open)}
        title="Create Workout">
        <CreateWorkout />
      </Modal>
    </>
  );
};
