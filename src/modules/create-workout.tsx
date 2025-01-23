import React, { useState } from "react";

const CreateWorkout: React.FC = () => {
  const [exercise, setExercise] = useState({
    name: "",
    reps: [0],
    sets: 0,
    weights: [0],
  });

  const handleExerciseChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;

    if (name.startsWith("reps") || name.startsWith("weights")) {
      const index = parseInt(name.split("-")[1]);
      setExercise((prev) => ({
        ...prev,
        [name.startsWith("reps") ? "reps" : "weights"]: prev[
          name.startsWith("reps") ? "reps" : "weights"
        ].map((item, i) => (i === index ? parseInt(value) : item)),
      }));
    } else {
      setExercise((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const addRepsAndWeights = () => {
    setExercise((prev) => ({
      ...prev,
      sets: prev.sets + 1,
      reps: [...prev.reps, 0],
      weights: [...prev.weights, 0],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-gray-700 text-sm font-bold mb-2">
          Exercise Name:
        </label>
        <input
          type="text"
          name="name"
          value={exercise.name}
          onChange={handleExerciseChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      {exercise.reps.map((rep, index) => (
        <div key={index} className="mb-4 flex items-center">
          <span className="mr-4">Set {index + 1}</span>
          <div className="flex items-center mr-4">
            <label
              htmlFor={`reps-${index}`}
              className="mr-2 text-gray-700 text-sm font-medium">
              Reps:
            </label>
            <input
              type="number"
              name={`reps-${index}`}
              value={rep}
              onChange={handleExerciseChange}
              className="w-16 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center">
            <label
              htmlFor={`weights-${index}`}
              className="mr-2 text-gray-700 text-sm font-medium">
              Weights:
            </label>
            <input
              type="number"
              name={`weights-${index}`}
              value={exercise.weights[index]}
              onChange={handleExerciseChange}
              className="w-16 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>
      ))}
      <div className="flex justify-center space-x-4 mt-4">
        <button
          type="button"
          onClick={addRepsAndWeights}
          className="bg-blue-500 text-[16px] w-40 h-15 hover:bg-blue-700 text-white  py-2 px-4 rounded">
          Add Reps and Weights
        </button>

        <button
          type="submit"
          className="bg-green-500  text-[16px] w-40 h-15 hover:bg-green-700 text-white  py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Create Workout
        </button>
      </div>
    </form>
  );
};

export default CreateWorkout;
