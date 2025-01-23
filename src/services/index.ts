import axiosInstance from "./axios.config";
export const getWorkoutCalender = (): any => {
  return axiosInstance.get("/exercises");
};
