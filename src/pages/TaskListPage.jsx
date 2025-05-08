import React from "react";

const TaskListPage = () => {
  const tasks = [
    { id: 1, title: "Study React", completed: false },
    { id: 2, title: "Fix API integration", completed: true },
    { id: 3, title: "Write documentation", completed: false },
  ];
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">My Tasks</h2>

      <ul className="spacy-y-4">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`p-4 rounded shadow-md ${
              task.completed ? "bg-green-100" : "bg-white"
            }`}
          >
            <div className="flex justify-between items-center">
              <span
                className={`${
                  task.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {task.title}
              </span>
              <span
                className={`text-sm ${
                  task.completed ? "text-green-600" : "text-yellow-600"
                }`}
              >
                {task.completed ? "Done" : "In progress"}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskListPage;
