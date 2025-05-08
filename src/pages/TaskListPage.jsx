import React from "react";
import { Link } from "react-router-dom";
import { Edit, Trash2 } from "lucide-react";

const initialTasks = [
  { id: 1, title: "Study React", completed: false },
  { id: 2, title: "Fix API integration", completed: true },
  { id: 3, title: "Write documentation", completed: false },
];

const TaskListPage = () => {
  const [tasks, setTasks] = React.useState(initialTasks);

  const toggleCompleted = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    const confirmed = window.confirm("Are you sure you want delete this task?");
    if (confirmed) {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Task List</h1>
        <Link
          to="/tasks/new"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          New Task
        </Link>
      </div>

      <ul className="spacy-y-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="bg-white border shadow rounded p-4 flex justify-between mb-2"
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleCompleted(task.id)}
              />
              <Link
                to={`/tasks/${task.id}`}
                className={`text-blue-600 hover:underline ${
                  task.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {task.title}
              </Link>
            </div>

            <div className="flex gap-3 text-sm">
              <Link
                to={`/tasks/${tasks.id}/edit`}
                className="px-2 py-1 rounded text-gray-600 hover:underline"
                title="Edit Task"
              >
                <Edit size={18} />
              </Link>
              <button
                onClick={() => deleteTask(task.id)}
                className="px-2 py-1 rounded text-red-600 hover:underline"
                title="Delete"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskListPage;
