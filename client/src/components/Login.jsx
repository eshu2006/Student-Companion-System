import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function Login() {
  const { login, signup } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          return;
        }
        await signup(formData.name, formData.email, formData.password);
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 ${
      isDarkMode ? 'bg-dark-bg-primary' : 'bg-gray-100'
    }`}>
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-full ${
            isDarkMode 
              ? 'bg-dark-bg-secondary text-yellow-300' 
              : 'bg-white text-gray-600'
          }`}
        >
          {isDarkMode ? '🌙' : '☀️'}
        </button>
      </div>

      <div className={`w-full max-w-md p-8 rounded-xl shadow-lg ${
        isDarkMode ? 'bg-dark-bg-secondary' : 'bg-white'
      }`}>
        <h2 className={`text-3xl font-bold mb-6 text-center ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          {isLogin ? 'Student Scholar' : 'Create Account'}
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div>
              <label className={`block mb-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border ${
                  isDarkMode 
                    ? 'bg-dark-bg-primary border-gray-600 text-white' 
                    : 'bg-white border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-primary`}
                required
              />
            </div>
          )}

          <div>
            <label className={`block mb-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border ${
                isDarkMode 
                  ? 'bg-dark-bg-primary border-gray-600 text-white' 
                  : 'bg-white border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-primary`}
              required
            />
          </div>

          <div>
            <label className={`block mb-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border ${
                isDarkMode 
                  ? 'bg-dark-bg-primary border-gray-600 text-white' 
                  : 'bg-white border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-primary`}
              required
            />
          </div>

          {!isLogin && (
            <div>
              <label className={`block mb-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border ${
                  isDarkMode 
                    ? 'bg-dark-bg-primary border-gray-600 text-white' 
                    : 'bg-white border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-primary`}
                required
              />
            </div>
          )}

          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-lg ${
              isDarkMode 
                ? 'bg-primary-dark hover:bg-primary text-white' 
                : 'bg-primary hover:bg-secondary text-white'
            } transition-colors`}
          >
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <div className={`mt-4 text-center ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          {isLogin ? (
            <p>
              Don't have an account?{' '}
              <button
                onClick={() => {
                  setIsLogin(false);
                  setError('');
                  setFormData({
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                  });
                }}
                className="text-primary hover:text-secondary"
              >
                Sign up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button
                onClick={() => {
                  setIsLogin(true);
                  setError('');
                  setFormData({
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                  });
                }}
                className="text-primary hover:text-secondary"
              >
                Sign in
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}



