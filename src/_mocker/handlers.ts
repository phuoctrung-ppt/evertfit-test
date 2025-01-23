import { http, HttpResponse } from "msw";
import { faker } from "@faker-js/faker";
import { WorkoutDayResponse } from "../interfaces";

const currentMonth = new Date().getMonth() + 1;
const daysInMonth = new Date(
  new Date().getFullYear(),
  currentMonth,
  0
).getDate();
const response = Array.from({ length: daysInMonth }, (_, i) => {
  const date = (i + 1).toString().padStart(2, "0");
  return {
    id: faker.string.uuid(),
    date,
    workouts:
      Math.random() > 0.5
        ? Array(faker.number.int({ min: 1, max: 3 }))
            .fill({})
            .map(() => ({
              id: faker.string.uuid(),
              title: faker.lorem.words(3),
              exercises: Array.from(
                { length: faker.number.int({ min: 1, max: 5 }) },
                () => ({
                  name: faker.lorem.words(2),
                  sets: faker.number.int({ min: 1, max: 5 }),
                  reps: Array(faker.number.int({ min: 1, max: 4 })).fill(
                    faker.number.int({ min: 1, max: 10 })
                  ),
                  weight: Array(faker.number.int({ min: 1, max: 4 })).fill(
                    faker.number.int({ min: 10, max: 100 })
                  ),
                })
              ),
            }))
        : [],
  };
}) as WorkoutDayResponse[];

export const handlers = [
  http.get("/exercises", () => {
    return HttpResponse.json(response);
  }),

  http.put("/exercises/:id", () => {}),

  http.post("/exercises", () => {}),
];
// const createExercise = (workoutId: string, exercise: Exercise) => {
//   let updatedWorkout: Workout | undefined;
//   response = response.map((day) => {
//     const workout = day.workouts?.find((workout) => workout.id === workoutId);
//     if (workout) {
//       workout.exercises.push(exercise);
//       updatedWorkout = workout;
//     }
//     return day;
//   });
//   return updatedWorkout;
// };
