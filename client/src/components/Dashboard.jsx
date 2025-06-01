import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import Timetable from './Timetable';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const [currentView, setCurrentView] = useState('dashboard');
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Review lecture notes', completed: false, deadline: '2024-01-20T10:30' },
    { id: 2, text: 'Complete assignment draft', completed: true, deadline: '2024-01-19T15:00' },
    { id: 3, text: 'Schedule meeting with professor', completed: false, deadline: '2024-01-21T14:00' },
  ]);
  const [newTask, setNewTask] = useState('');
  const [newTaskDeadline, setNewTaskDeadline] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationTask, setNotificationTask] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [selectedHackathon, setSelectedHackathon] = useState(null);
  const [registrationData, setRegistrationData] = useState({
    name: '',
    email: '',
    branch: '',
    rollNumber: '',
    year: '',
  });
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [registeredStudentName, setRegisteredStudentName] = useState('');
  const [registeredHackathonTitle, setRegisteredHackathonTitle] = useState('');

  const studentChapters = {
    ACM: {
      name: 'ACM Student Chapter',
      logo: '🔷',
      hackathons: [
        {
          id: 1,
          title: 'CodeCraft 2024',
          date: '2024-02-15',
          registrationOpen: true,
          participants: 120,
          prize: '$1000'
        },
        {
          id: 2,
          title: 'AI Innovation Challenge',
          date: '2024-03-01',
          registrationOpen: true,
          participants: 80,
          prize: '$800'
        }
      ]
    },
    CSI: {
      name: 'Computer Society of India',
      logo: '🔶',
      hackathons: [
        {
          id: 1,
          title: 'WebDev Summit',
          date: '2024-02-20',
          registrationOpen: true,
          participants: 150,
          prize: '$1200'
        }
      ]
    },
    IEEE: {
      name: 'IEEE Student Branch',
      logo: '⚡',
      hackathons: [
        {
          id: 1,
          title: 'IoT Challenge',
          date: '2024-02-25',
          registrationOpen: true,
          participants: 100,
          prize: '$1500'
        }
      ]
    },
    KRITHOMEDH: {
      name: 'Krithomedh',
      logo: '🎯',
      hackathons: [
        {
          id: 1,
          title: 'Innovation Sprint',
          date: '2024-03-10',
          registrationOpen: true,
          participants: 90,
          prize: '$1000'
        }
      ]
    },
    ISTE: {
      name: 'ISTE Student Chapter',
      logo: '🎓',
      hackathons: [
        {
          id: 1,
          title: 'EduTech Hackathon',
          date: '2024-03-15',
          registrationOpen: true,
          participants: 110,
          prize: '$900'
        }
      ]
    },
    LUCEE: {
      name: 'LUCEE',
      logo: '💡',
      hackathons: [
        {
          id: 1,
          title: 'Green Innovation Challenge',
          date: '2024-03-20',
          registrationOpen: true,
          participants: 95,
          prize: '$1100'
        }
      ]
    }
  };

  const [assignments] = useState([
    {
      id: 1,
      name: 'Data Structures Lab Report',
      course: 'CS 241',
      due: '2024-01-20T23:59',
      totalMarks: 10,
      status: 'pending',
      submitted: false
    },
    {
      id: 2,
      name: 'Database Management System',
      course: 'CS 301',
      due: '2024-01-19T15:00',
      totalMarks: 5,
      status: 'overdue',
      submitted: false
    },
    {
      id: 3,
      name: 'Machine Learning Assignment',
      course: 'CS 401',
      due: '2024-01-21T14:00',
      totalMarks: 10,
      status: 'pending',
      submitted: false
    },
    {
      id: 4,
      name: 'Web Technologies Project',
      course: 'CS 351',
      due: '2024-01-18T23:59',
      totalMarks: 5,
      status: 'overdue',
      submitted: false
    }
  ]);

  const [showAssignmentNotification, setShowAssignmentNotification] = useState(false);
  const [notificationAssignment, setNotificationAssignment] = useState(null);

  const [todaysClasses] = useState([
    {
      name: 'Advanced Algorithms',
      time: '10:00 AM - 11:30 AM',
      location: 'Davis Hall 302',
      professor: 'Prof. Robert Johnson',
      isNext: true,
      attended: true
    },
    {
      name: 'Database Systems',
      time: '12:00 PM - 1:30 PM',
      location: 'Engineering Block 205',
      professor: 'Prof. Sarah Williams',
      isNext: false,
      attended: true
    },
    {
      name: 'Web Development',
      time: '2:00 PM - 3:30 PM',
      location: 'CS Lab 101',
      professor: 'Prof. Michael Chen',
      isNext: false,
      attended: false
    },
    {
      name: 'Software Engineering',
      time: '4:00 PM - 5:30 PM',
      location: 'Room 405',
      professor: 'Prof. Emily Brown',
      isNext: false,
      attended: true
    }
  ]);

  useEffect(() => {
    const checkDeadlines = setInterval(() => {
      const now = new Date();
      tasks.forEach(task => {
        if (!task.completed && new Date(task.deadline) <= now) {
          setNotificationTask(task);
          setShowNotification(true);
        }
      });
    }, 60000); // Check every minute

    return () => clearInterval(checkDeadlines);
  }, [tasks]);

  useEffect(() => {
    const checkAssignmentDeadlines = setInterval(() => {
      const now = new Date();
      assignments.forEach(assignment => {
        if (!assignment.submitted && new Date(assignment.due) <= now) {
          setNotificationAssignment(assignment);
          setShowAssignmentNotification(true);
        }
      });
    }, 60000); // Check every minute

    return () => clearInterval(checkAssignmentDeadlines);
  }, [assignments]);

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim() || !newTaskDeadline) return;

    const newTaskObj = {
      id: Date.now(),
      text: newTask,
      completed: false,
      deadline: newTaskDeadline
    };

    setTasks([...tasks, newTaskObj]);
    setNewTask('');
    setNewTaskDeadline('');
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const toggleTask = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const formatDeadline = (deadline) => {
    return new Date(deadline).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isOverdue = (deadline) => {
    return new Date(deadline) <= new Date();
  };

  const formatAssignmentDeadline = (deadline) => {
    return new Date(deadline).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleRegistration = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to save the registration
    console.log('Registration submitted:', {
      hackathon: selectedHackathon,
      student: registrationData
    });
    
    // Store both student name and hackathon title before resetting the form
    setRegisteredStudentName(registrationData.name);
    setRegisteredHackathonTitle(selectedHackathon.title);
    
    // Reset form and close modal
    setRegistrationData({
      name: '',
      email: '',
      branch: '',
      rollNumber: '',
      year: '',
    });
    setShowRegistrationForm(false);
    setSelectedHackathon(null);
    
    // Show success popup
    setShowSuccessPopup(true);
    
    // Automatically hide the success popup after 5 seconds
    setTimeout(() => {
      setShowSuccessPopup(false);
      setRegisteredStudentName('');
      setRegisteredHackathonTitle('');
    }, 5000);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'timetable':
        return <Timetable />;
      case 'chapters':
        return (
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-6">Student Chapters & Hackathons</h2>
            
            {/* Chapters Grid */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              {Object.entries(studentChapters).map(([key, chapter]) => (
                <div
                  key={key}
                  onClick={() => setSelectedChapter(key)}
                  className={`p-6 rounded-xl cursor-pointer transition-all ${
                    selectedChapter === key 
                      ? 'bg-primary text-white shadow-lg scale-105' 
                      : 'bg-white hover:bg-primary/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{chapter.logo}</span>
                    <div>
                      <h3 className={`font-semibold ${selectedChapter === key ? 'text-white' : 'text-gray-800'}`}>
                        {chapter.name}
                      </h3>
                      <p className={`text-sm ${selectedChapter === key ? 'text-white/80' : 'text-gray-500'}`}>
                        {chapter.hackathons.length} Hackathons
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Hackathons List */}
            {selectedChapter && (
              <div className="bg-white rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">
                    {studentChapters[selectedChapter].name} Hackathons
                  </h3>
                  <button
                    onClick={() => setSelectedChapter(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  {studentChapters[selectedChapter].hackathons.map((hackathon) => (
                    <div key={hackathon.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="font-semibold text-lg">{hackathon.title}</h4>
                        <span className={`px-3 py-1 rounded-full text-xs ${
                          hackathon.registrationOpen 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {hackathon.registrationOpen ? 'Registration Open' : 'Registration Closed'}
                        </span>
                      </div>
                      
                      <div className="space-y-2 text-gray-600 mb-4">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>{new Date(hackathon.date).toLocaleDateString()}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <span>{hackathon.participants} Participants</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>Prize: {hackathon.prize}</span>
                        </div>
                      </div>

                      {hackathon.registrationOpen && (
                        <button
                          onClick={() => {
                            setSelectedHackathon(hackathon);
                            setShowRegistrationForm(true);
                          }}
                          className="w-full bg-primary text-white py-2 rounded-lg hover:bg-secondary transition-colors"
                        >
                          Register Now
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Registration Modal */}
            {showRegistrationForm && selectedHackathon && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-xl p-6 w-full max-w-md">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">Register for {selectedHackathon.title}</h3>
                    <button
                      onClick={() => {
                        setShowRegistrationForm(false);
                        setSelectedHackathon(null);
                      }}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      ×
                    </button>
                  </div>

                  <form onSubmit={handleRegistration} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={registrationData.name}
                        onChange={(e) => setRegistrationData({...registrationData, name: e.target.value})}
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={registrationData.email}
                        onChange={(e) => setRegistrationData({...registrationData, email: e.target.value})}
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Branch
                      </label>
                      <select
                        value={registrationData.branch}
                        onChange={(e) => setRegistrationData({...registrationData, branch: e.target.value})}
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      >
                        <option value="">Select Branch</option>
                        <option value="CSE">Computer Science Engineering</option>
                        <option value="IT">Information Technology</option>
                        <option value="AIML">Machine Learning</option>
                        <option value="ME">Mechanical Engineering</option>
                        <option value="ECE">Electronic & Communication Engineering</option>
                        <option value="DS">Data Science</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Roll Number
                      </label>
                      <input
                        type="text"
                        value={registrationData.rollNumber}
                        onChange={(e) => setRegistrationData({...registrationData, rollNumber: e.target.value})}
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Year
                      </label>
                      <select
                        value={registrationData.year}
                        onChange={(e) => setRegistrationData({...registrationData, year: e.target.value})}
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      >
                        <option value="">Select Year</option>
                        <option value="1">1st Year</option>
                        <option value="2">2nd Year</option>
                        <option value="3">3rd Year</option>
                        <option value="4">4th Year</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-primary text-white py-2 rounded-lg hover:bg-secondary transition-colors"
                    >
                      Submit Registration
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* Success Popup */}
            {showSuccessPopup && (
              <div className="fixed top-4 right-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-lg animate-fade-in z-50">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold">Registration Successful! 🎉</p>
                    <p className="mt-1">
                      <span className="font-semibold">{registeredStudentName}</span> has successfully registered for{' '}
                      <span className="font-semibold">{registeredHackathonTitle}</span>
                    </p>
                    <p className="text-sm mt-2">
                      We'll send further details to your registered email address.
                    </p>
                  </div>
                  <button 
                    onClick={() => setShowSuccessPopup(false)}
                    className="text-green-700 hover:text-green-900 ml-4"
                  >
                    ×
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      case 'assignments':
        return (
          <div className="p-8">
            <div className="flex items-center gap-2 mb-6">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h2 className="text-2xl font-bold text-gray-800">Assignment Tracker</h2>
            </div>

            {/* Assignment Notification Pop-up */}
            {showAssignmentNotification && notificationAssignment && (
              <div className="fixed top-4 right-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-lg z-50">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold">Assignment Deadline Passed!</p>
                    <p>{notificationAssignment.name}</p>
                    <p className="text-sm mt-1">Score: 0/{notificationAssignment.totalMarks}</p>
                  </div>
                  <button 
                    onClick={() => setShowAssignmentNotification(false)}
                    className="text-red-700 hover:text-red-900"
                  >
                    ×
                  </button>
                </div>
              </div>
            )}

            {/* Assignment Categories */}
            <div className="grid grid-cols-2 gap-6">
              {/* Pending Assignments */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4 text-yellow-600 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Pending Assignments
                </h3>
                <div className="space-y-4">
                  {assignments
                    .filter(assignment => assignment.status === 'pending')
                    .map((assignment) => (
                      <div key={assignment.id} 
                        className="border rounded-lg p-4 bg-white hover:shadow-md transition-shadow"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold">{assignment.name}</h4>
                            <p className="text-sm text-gray-500">{assignment.course}</p>
                            <p className="text-sm text-gray-500">
                              Due: {formatAssignmentDeadline(assignment.due)}
                            </p>
                            <p className="text-sm text-gray-500">
                              Total Marks: {assignment.totalMarks}
                            </p>
                          </div>
                          <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                            Pending
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Overdue Assignments */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4 text-red-600 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Overdue Assignments
                </h3>
                <div className="space-y-4">
                  {assignments
                    .filter(assignment => assignment.status === 'overdue')
                    .map((assignment) => (
                      <div key={assignment.id} 
                        className="border rounded-lg p-4 bg-red-50 border-red-200"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold">{assignment.name}</h4>
                            <p className="text-sm text-gray-500">{assignment.course}</p>
                            <p className="text-sm text-gray-500">
                              Due: {formatAssignmentDeadline(assignment.due)}
                            </p>
                            <p className="text-sm text-red-600 font-semibold">
                              Score: 0/{assignment.totalMarks}
                            </p>
                          </div>
                          <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                            Overdue
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Assignment Statistics */}
            <div className="mt-6 bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Assignment Overview</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-blue-600">Total Assignments</p>
                  <p className="text-2xl font-bold text-blue-700">{assignments.length}</p>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4">
                  <p className="text-sm text-yellow-600">Pending</p>
                  <p className="text-2xl font-bold text-yellow-700">
                    {assignments.filter(a => a.status === 'pending').length}
                  </p>
                </div>
                <div className="bg-red-50 rounded-lg p-4">
                  <p className="text-sm text-red-600">Overdue</p>
                  <p className="text-2xl font-bold text-red-700">
                    {assignments.filter(a => a.status === 'overdue').length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'notes':
        return (
          <div className="p-8">
            <div className="flex items-center gap-2 mb-6">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <h2 className="text-2xl font-bold text-gray-800">Course Notes</h2>
            </div>

            {/* Subject Categories */}
            <div className="grid grid-cols-3 gap-6">
              {/* Data Structures */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold">Data Structures</h3>
                </div>
                <div className="space-y-3">
                  {[
                    { name: 'Arrays and Linked Lists', date: '2024-01-15', size: '2.5 MB' },
                    { name: 'Trees and Graphs', date: '2024-01-18', size: '3.1 MB' },
                    { name: 'Hash Tables', date: '2024-01-20', size: '1.8 MB' }
                  ].map((note, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        <div>
                          <p className="font-medium text-sm">{note.name}</p>
                          <p className="text-xs text-gray-500">Uploaded: {note.date}</p>
                        </div>
                      </div>
                      <button className="flex items-center gap-1 text-sm text-primary hover:text-secondary">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        <span>{note.size}</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Java Programming */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold">Java Programming</h3>
                </div>
                <div className="space-y-3">
                  {[
                    { name: 'OOP Concepts', date: '2024-01-16', size: '4.2 MB' },
                    { name: 'Exception Handling', date: '2024-01-19', size: '2.8 MB' },
                    { name: 'Collections Framework', date: '2024-01-21', size: '3.5 MB' }
                  ].map((note, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        <div>
                          <p className="font-medium text-sm">{note.name}</p>
                          <p className="text-xs text-gray-500">Uploaded: {note.date}</p>
                        </div>
                      </div>
                      <button className="flex items-center gap-1 text-sm text-primary hover:text-secondary">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        <span>{note.size}</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Database Management */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold">Database Management</h3>
                </div>
                <div className="space-y-3">
                  {[
                    { name: 'SQL Basics', date: '2024-01-17', size: '3.7 MB' },
                    { name: 'Normalization', date: '2024-01-20', size: '2.9 MB' },
                    { name: 'Transactions', date: '2024-01-22', size: '3.2 MB' }
                  ].map((note, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        <div>
                          <p className="font-medium text-sm">{note.name}</p>
                          <p className="text-xs text-gray-500">Uploaded: {note.date}</p>
                        </div>
                      </div>
                      <button className="flex items-center gap-1 text-sm text-primary hover:text-secondary">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        <span>{note.size}</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Updates */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Recent Updates</h3>
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="space-y-2">
                  {[
                    { subject: 'Data Structures', note: 'New chapter on AVL Trees added', time: '2 hours ago' },
                    { subject: 'Java Programming', note: 'Updated content for Multithreading', time: '1 day ago' },
                    { subject: 'Database Management', note: 'Practice problems added', time: '2 days ago' }
                  ].map((update, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium">{update.subject}: {update.note}</p>
                        <p className="text-xs text-gray-500">{update.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div>
            <div className="bg-primary rounded-xl p-6 text-white mb-8">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold mb-2">Welcome back, {user.name}!</h1>
                  <p className="text-primary-100">Here's what's happening with your academic schedule today.</p>
                  <p className="mt-4 text-sm">Sunday, April 27, 2025</p>
                </div>
                <div className="bg-white/20 rounded-lg p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">78%</div>
                    <div className="text-sm">Academic Progress</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-8">
              {/* Today's Classes */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Today's Classes</h2>
                  <div className="flex items-center gap-2">
                    <div className="text-2xl font-bold text-primary">
                      {todaysClasses.filter(c => c.attended).length}/{todaysClasses.length}
                    </div>
                    <div className="text-sm text-gray-500">Classes Attended</div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {todaysClasses.map((class_, index) => (
                    <div 
                      key={index} 
                      className={`border rounded-lg p-4 ${
                        class_.attended ? 'bg-green-50 border-green-200' : 'bg-white'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{class_.name}</h3>
                          <p className="text-sm text-gray-500">{class_.time}</p>
                          <p className="text-sm text-gray-500">{class_.location}</p>
                          <p className="text-sm text-gray-500">{class_.professor}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {class_.isNext && (
                            <span className="bg-primary text-white text-xs px-2 py-1 rounded">
                              Next
                            </span>
                          )}
                          <span className={`text-xs px-2 py-1 rounded ${
                            class_.attended 
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {class_.attended ? 'Attended' : 'Missed'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Attendance Progress Bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Today's Attendance</span>
                    <span>{Math.round((todaysClasses.filter(c => c.attended).length / todaysClasses.length) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ 
                        width: `${(todaysClasses.filter(c => c.attended).length / todaysClasses.length) * 100}%` 
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Assignment Tracker */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Assignment Tracker</h2>
                
                {/* Assignment Notification Pop-up */}
                {showAssignmentNotification && notificationAssignment && (
                  <div className="fixed top-4 right-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-lg z-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold">Assignment Deadline Passed!</p>
                        <p>{notificationAssignment.name}</p>
                        <p className="text-sm mt-1">Score: 0/{notificationAssignment.totalMarks}</p>
                      </div>
                      <button 
                        onClick={() => setShowAssignmentNotification(false)}
                        className="text-red-700 hover:text-red-900"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  {assignments.map((assignment) => (
                    <div 
                      key={assignment.id} 
                      className={`border rounded-lg p-4 ${
                        assignment.status === 'overdue' 
                          ? 'bg-red-50 border-red-200' 
                          : 'bg-white border-gray-200'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{assignment.name}</h3>
                          <p className="text-sm text-gray-500">{assignment.course}</p>
                          <p className="text-sm text-gray-500">
                            Due: {formatAssignmentDeadline(assignment.due)}
                          </p>
                          <p className={`text-sm ${
                            assignment.status === 'overdue' 
                              ? 'text-red-600 font-semibold' 
                              : 'text-gray-500'
                          }`}>
                            Score: {assignment.submitted ? `${assignment.totalMarks}/${assignment.totalMarks}` : `0/${assignment.totalMarks}`}
                          </p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded ${
                          assignment.status === 'pending' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {assignment.status === 'pending' ? 'Pending' : 'Overdue'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Personal To-Do List */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Personal To-Do List</h2>
                
                {/* Notification Pop-up */}
                {showNotification && notificationTask && (
                  <div className="fixed top-4 right-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold">Task Deadline Alert!</p>
                        <p>{notificationTask.text}</p>
                      </div>
                      <button 
                        onClick={() => setShowNotification(false)}
                        className="text-red-700 hover:text-red-900"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <form onSubmit={addTask} className="flex flex-col gap-2">
                    <input
                      type="text"
                      value={newTask}
                      onChange={(e) => setNewTask(e.target.value)}
                      placeholder="Add a new task..."
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <div className="flex gap-2">
                      <input
                        type="datetime-local"
                        value={newTaskDeadline}
                        onChange={(e) => setNewTaskDeadline(e.target.value)}
                        className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <button 
                        type="submit"
                        className="bg-primary text-white p-2 rounded-lg hover:bg-secondary transition-colors duration-200"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                  </form>

                  {tasks.map((task) => (
                    <div 
                      key={task.id} 
                      className={`flex items-center justify-between group p-3 rounded-lg border ${
                        !task.completed && isOverdue(task.deadline) 
                          ? 'bg-red-50 border-red-200' 
                          : 'bg-white border-gray-200'
                      }`}
                    >
                      <div className="flex items-center space-x-3 flex-1">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => toggleTask(task.id)}
                          className="w-5 h-5 text-primary rounded focus:ring-primary"
                        />
                        <div className="flex-1">
                          <span className={`${task.completed ? 'line-through text-gray-400' : ''}`}>
                            {task.text}
                          </span>
                          <div className={`text-sm ${
                            !task.completed && isOverdue(task.deadline) 
                              ? 'text-red-600' 
                              : 'text-gray-500'
                          }`}>
                            Due: {formatDeadline(task.deadline)}
                          </div>
                        </div>
                      </div>
                      <button 
                        onClick={() => deleteTask(task.id)}
                        className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-opacity"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16M4 12h16M4 18h16" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  const navItems = [
    { name: 'Dashboard', view: 'dashboard', icon: '📊' },
    { name: 'Timetable', view: 'timetable', icon: '📅' },
    { name: 'Notes', view: 'notes', icon: '📝' },
    { name: 'Assignments', view: 'assignments', icon: '📚' },
    { name: 'Student Chapters', view: 'chapters', icon: '👥' }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-dark-bg-primary' : 'bg-gray-100'}`}>
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-64 ${
        isDarkMode ? 'bg-dark-bg-secondary border-r border-gray-700' : 'bg-white'
      } shadow-lg z-10`}>
        <div className="p-6">
          <div className="space-y-4">
            {/* Header and Theme Toggle */}
            <div className="flex items-center justify-between mb-8">
              <div className={`flex items-center space-x-3 ${
                isDarkMode ? 'text-primary-dark' : 'text-primary'
              } font-semibold text-xl`}>
                <span>Dashboard</span>
              </div>
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg ${
                  isDarkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-600'
                }`}
              >
                {isDarkMode ? '🌙' : '☀️'}
              </button>
            </div>

            {/* Navigation Items */}
            <nav className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => setCurrentView(item.view)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    currentView === item.view
                      ? isDarkMode 
                        ? 'bg-primary-dark text-white' 
                        : 'bg-primary text-white'
                      : isDarkMode
                        ? 'text-gray-400 hover:bg-gray-700 hover:text-white'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-primary'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </button>
              ))}
            </nav>

            {/* Logout Button */}
            <div className="absolute bottom-6 left-6 right-6">
              <button
                onClick={logout}
                className={`w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg ${
                  isDarkMode
                    ? 'bg-red-900 text-white hover:bg-red-800'
                    : 'bg-red-500 text-white hover:bg-red-600'
                } transition-colors`}
              >
                <span>🚪</span>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`ml-64 min-h-screen ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
        <div className="p-8">
          {renderContent()}
        </div>
      </div>

      {/* Notifications */}
      {showNotification && notificationTask && (
        <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg ${
          isDarkMode ? 'bg-dark-bg-secondary' : 'bg-white'
        }`}>
          {/* ... notification content ... */}
        </div>
      )}
    </div>
  );
}






















