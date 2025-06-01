import { useTheme } from '../context/ThemeContext';

export default function Notifications({ notification, onClose }) {
  const { isDarkMode } = useTheme();

  return (
    <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg ${
      isDarkMode 
        ? 'bg-dark-bg-secondary text-white' 
        : 'bg-white text-gray-800'
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`w-2 h-2 rounded-full ${
            isDarkMode ? 'bg-primary-dark' : 'bg-primary'
          }`} />
          <span className="font-medium">{notification.title}</span>
        </div>
        <button
          onClick={onClose}
          className={`ml-4 ${
            isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          ×
        </button>
      </div>
      <p className={`mt-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        {notification.message}
      </p>
    </div>
  );
}