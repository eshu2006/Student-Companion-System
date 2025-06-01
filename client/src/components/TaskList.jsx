import { useTheme } from '../context/ThemeContext';

export default function TaskList({ tasks, onToggle, onDelete }) {
  const { isDarkMode } = useTheme();

  const isOverdue = (deadline) => {
    return new Date(deadline) < new Date();
  };

  return (
    <div className={`rounded-xl shadow-lg ${
      isDarkMode ? 'bg-dark-bg-secondary' : 'bg-white'
    }`}>
      <div className="p-6">
        <h3 className={`text-xl font-semibold mb-4 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Tasks
        </h3>
        <div className="space-y-3">
          {tasks.map(task => (
            <div
              key={task.id}
              className={`flex items-center justify-between p-3 rounded-lg ${
                isDarkMode
                  ? 'bg-dark-bg-primary border border-gray-700'
                  : 'bg-gray-50 border border-gray-200'
              } ${
                !task.completed && isOverdue(task.deadline)
                  ? isDarkMode ? 'border-red-800' : 'border-red-300'
                  : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => onToggle(task.id)}
                  className={`w-5 h-5 rounded ${
                    isDarkMode ? 'bg-dark-bg-secondary' : 'bg-white'
                  }`}
                />
                <div>
                  <span className={`${
                    task.completed 
                      ? 'line-through text-gray-500' 
                      : isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {task.text}
                  </span>
                  <p className={`text-sm ${
                    !task.completed && isOverdue(task.deadline)
                      ? 'text-red-500'
                      : isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    Due: {new Date(task.deadline).toLocaleString()}
                  </p>
                </div>
              </div>
              <button
                onClick={() => onDelete(task.id)}
                className={`p-2 rounded-lg ${
                  isDarkMode
                    ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}