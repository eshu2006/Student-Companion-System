import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function Timetable() {
  const { isDarkMode } = useTheme();
  
  const schedule = {
    Monday: [
      {
        subject: 'Design & Analysis of Algorithms',
        time: '09:00 - 10:30',
        room: 'Room 301'
      },
      {
        subject: 'Operating Systems',
        time: '10:45 - 12:15',
        room: 'CS Lab 102'
      },
      {
        subject: 'Database Management Systems',
        time: '14:00 - 15:30',
        room: 'DB Lab 201'
      }
    ],
    Tuesday: [
      {
        subject: 'Computer Networks',
        time: '09:00 - 10:30',
        room: 'Networks Lab'
      },
      {
        subject: 'Java Programming',
        time: '10:45 - 12:15',
        room: 'CS Lab 103'
      },
      {
        subject: 'Software Engineering',
        time: '14:00 - 15:30',
        room: 'Room 302'
      }
    ],
    Wednesday: [
      {
        subject: 'Python Programming',
        time: '09:00 - 10:30',
        room: 'CS Lab 101'
      },
      {
        subject: 'Machine Learning',
        time: '10:45 - 12:15',
        room: 'AI Lab'
      },
      {
        subject: 'Web Technologies',
        time: '14:00 - 15:30',
        room: 'Room 303'
      }
    ],
    Thursday: [
      {
        subject: 'Cloud Computing',
        time: '09:00 - 10:30',
        room: 'CC Lab'
      },
      {
        subject: 'Artificial Intelligence',
        time: '10:45 - 12:15',
        room: 'AI Lab'
      },
      {
        subject: 'Cyber Security',
        time: '14:00 - 15:30',
        room: 'Networks Lab'
      }
    ],
    Friday: [
      {
        subject: 'Data Science',
        time: '09:00 - 10:30',
        room: 'DS Lab'
      },
      {
        subject: 'Mobile App Development',
        time: '10:45 - 12:15',
        room: 'CS Lab 104'
      },
      {
        subject: 'Deep Learning',
        time: '14:00 - 15:30',
        room: 'AI Lab'
      }
    ],
    Saturday: [
      {
        subject: 'Project Workshop',
        time: '10:00 - 11:30',
        room: 'Project Lab'
      },
      {
        subject: 'Technical Seminar',
        time: '11:45 - 13:15',
        room: 'Seminar Hall'
      }
    ]
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-2 mb-8">
        <svg 
          className="w-6 h-6 text-primary"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
          />
        </svg>
        <h1 className="text-2xl font-bold">Weekly Class Schedule</h1>
      </div>

      <div className="grid grid-cols-6 gap-4">
        {Object.entries(schedule).map(([day, classes]) => (
          <div key={day} className="space-y-4">
            <div className={`p-3 rounded-lg ${
              isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
            }`}>
              <h2 className="font-semibold text-lg">{day}</h2>
            </div>
            
            {classes.map((classInfo, index) => (
              <div 
                key={index}
                className={`p-4 rounded-lg border ${
                  isDarkMode 
                    ? 'bg-dark-bg-secondary border-gray-700' 
                    : 'bg-white border-gray-200'
                } shadow-sm hover:shadow-md transition-shadow`}
              >
                <h3 className="font-semibold text-sm mb-2">{classInfo.subject}</h3>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <svg 
                      className="w-4 h-4" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
                      />
                    </svg>
                    <span>{classInfo.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <svg 
                      className="w-4 h-4" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" 
                      />
                    </svg>
                    <span>{classInfo.room}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}




