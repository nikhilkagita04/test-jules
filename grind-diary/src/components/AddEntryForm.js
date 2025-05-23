import React, { useState } from 'react';
import './AddEntryForm.css'; // Import the CSS file

const AddEntryForm = ({ onNewEntry }) => {
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [updateText, setUpdateText] = useState('');
  const [hoursSpent, setHoursSpent] = useState('');
  const [tasksCompleted, setTasksCompleted] = useState('');
  const [struggles, setStruggles] = useState('');
  const [learnings, setLearnings] = useState('');
  const [tactics, setTactics] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title || !updateText || !author) {
      alert('Please fill in at least Author, Title, and Update Text.');
      return;
    }

    const newEntry = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      author,
      title,
      updateText,
      metrics: {
        hoursSpent: hoursSpent ? parseInt(hoursSpent, 10) : 0,
        tasksCompleted: tasksCompleted ? parseInt(tasksCompleted, 10) : 0,
      },
      struggles,
      learnings,
      tactics,
    };

    if (typeof onNewEntry === 'function') {
      onNewEntry(newEntry);
    } else {
      console.warn("onNewEntry prop is not a function or not provided");
    }

    // Reset form fields
    setAuthor('');
    setTitle('');
    setUpdateText('');
    setHoursSpent('');
    setTasksCompleted('');
    setStruggles('');
    setLearnings('');
    setTactics('');
  };

  return (
    <form onSubmit={handleSubmit} className="add-entry-form">
      <div className="form-field-group">
        <label htmlFor="author">Author:</label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </div>

      <div className="form-field-group">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="form-field-group">
        <label htmlFor="updateText">Update Text:</label>
        <textarea
          id="updateText"
          value={updateText}
          onChange={(e) => setUpdateText(e.target.value)}
          required
        />
      </div>

      <div className="form-field-group">
        <label htmlFor="hoursSpent">Hours Spent:</label>
        <input
          type="number"
          id="hoursSpent"
          value={hoursSpent}
          onChange={(e) => setHoursSpent(e.target.value)}
          min="0"
        />
      </div>

      <div className="form-field-group">
        <label htmlFor="tasksCompleted">Tasks Completed:</label>
        <input
          type="number"
          id="tasksCompleted"
          value={tasksCompleted}
          onChange={(e) => setTasksCompleted(e.target.value)}
          min="0"
        />
      </div>

      <div className="form-field-group">
        <label htmlFor="struggles">Struggles:</label>
        <textarea
          id="struggles"
          value={struggles}
          onChange={(e) => setStruggles(e.target.value)}
        />
      </div>

      <div className="form-field-group">
        <label htmlFor="learnings">Learnings:</label>
        <textarea
          id="learnings"
          value={learnings}
          onChange={(e) => setLearnings(e.target.value)}
        />
      </div>

      <div className="form-field-group">
        <label htmlFor="tactics">Tactics for Next Time:</label>
        <textarea
          id="tactics"
          value={tactics}
          onChange={(e) => setTactics(e.target.value)}
        />
      </div>

      <button type="submit">
        Add Entry
      </button>
    </form>
  );
};

export default AddEntryForm;
