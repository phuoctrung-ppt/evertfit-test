import { Exercise } from "../interfaces";
import axiosInstance from "./axios.config";
export const getWorkoutCalender = (): any => {
  return axiosInstance.get("/exercises");
};

export const createWorkout = (
  workoutId: string,
  exercise: Omit<Exercise, "id">
): any => {
  return axiosInstance.post(`/exercises/${workoutId}`, exercise);
};
