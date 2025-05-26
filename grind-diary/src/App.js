import React, { useState } from 'react';
import './App.css'; // Assuming default CRA CSS
import DiaryFeed from './components/DiaryFeed';
import AddEntryForm from './components/AddEntryForm';

const initialData = [
  {
    id: '1',
    author: 'Alice Wonderland',
    timestamp: new Date(2023, 10, 15, 10, 30, 0).toISOString(), // Month 10 is November
    title: 'Day 1 of Project X',
    updateText: 'Started outlining the main features and setting up the project environment. Felt productive!',
    metrics: {
      hoursSpent: 4,
      tasksCompleted: 3,
    },
    struggles: 'Initial setup had a few hiccups with dependency versions.',
    learnings: 'Double-checking compatibility for packages is key.',
    tactics: 'Used official documentation for troubleshooting setup issues.'
  },
  {
    id: '2',
    author: 'Bob The Builder',
    timestamp: new Date(2023, 10, 16, 14, 0, 0).toISOString(), // Month 10 is November
    title: 'Frontend Development Progress',
    updateText: 'Worked on the main UI components and got the basic layout working. Styling is next.',
    metrics: {
      hoursSpent: 6,
      tasksCompleted: 5,
    },
    struggles: 'CSS alignment was a bit tricky for one of the dynamic elements.',
    learnings: 'Flexbox is powerful once you get the hang of it.',
    tactics: 'Will use a CSS reset to ensure consistency across browsers.'
  },
  {
    id: '3',
    author: 'Charlie Brown',
    timestamp: new Date(2023, 10, 17, 9, 15, 0).toISOString(), // Month 10 is November
    title: 'API Integration Challenges',
    updateText: 'Attempted to integrate the first API endpoint. Facing some CORS issues.',
    metrics: {
      hoursSpent: 3,
      tasksCompleted: 1,
    },
    struggles: 'CORS errors are blocking API requests from the frontend.',
    learnings: 'Server-side configuration for CORS is necessary.',
    tactics: 'Will research backend CORS setup and try proxying requests.'
  }
];

function App() {
  const [entries, setEntries] = useState(initialData);
  const [showForm, setShowForm] = useState(false); // Default to showing the feed

  const handleNewEntry = (newEntry) => {
    setEntries(prevEntries => [newEntry, ...prevEntries]); // Prepend new entry
    setShowForm(false); // Switch back to the feed after adding an entry
  };

  return (
    <div className="App">
      <header className="App-header"> {/* Using App-header for potential default styling */}
        <h1>The Grind Diary</h1>
      </header>
      <main>
        {showForm ? (
          <>
            <button onClick={() => setShowForm(false)} className="toggle-button">
              Back to Feed
            </button>
            <AddEntryForm onNewEntry={handleNewEntry} />
          </>
        ) : (
          <>
            <button onClick={() => setShowForm(true)} className="toggle-button">
              Add New Grind
            </button>
            <DiaryFeed entries={entries} />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
