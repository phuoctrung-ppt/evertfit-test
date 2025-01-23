import { DAY } from "../constants";

type Calendar = {
  [key in keyof typeof DAY]: string;
};

type Exercise = {
  id: string;
  name: string;
  sets: number;
  weight?: number[];
  reps?: number[];
};

type Workout = {
  title: string;
  id: string;
  exercises: Exercise[];
};

type WorkoutDayResponse = {
  id: string;
  date: string;
  workouts?: Workout[];
};

export type { Calendar, Exercise, Workout, WorkoutDayResponse };
