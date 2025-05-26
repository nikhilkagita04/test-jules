import React, { useState } from 'react';
import './DiaryEntry.css'; // Import the CSS file

const DiaryEntry = ({ entry }) => {
  const [likes, setLikes] = useState(0);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleComment = () => {
    console.log("Comment button clicked");
  };

  const handleShare = () => {
    console.log("Share button clicked");
  };

  if (!entry) {
    return <div className="diary-entry entry-no-data"><p>No entry data provided.</p></div>;
  }

  const formattedTimestamp = entry.timestamp 
    ? new Date(entry.timestamp).toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    : 'N/A';

  return (
    <div className="diary-entry">
      <div className="entry-header">
        <h3 className="entry-title">{entry.title || 'Untitled Entry'}</h3>
        <p className="entry-meta">
          By: {entry.author || 'Unknown Author'} | On: {formattedTimestamp}
        </p>
      </div>

      {entry.updateText && (
        <div>
          <h4 className="entry-section-title">
            <span className="entry-section-title-icon">📝</span>
            Update
          </h4>
          <p className="entry-content">{entry.updateText}</p>
        </div>
      )}

      {entry.metrics && (entry.metrics.hoursSpent !== undefined || entry.metrics.tasksCompleted !== undefined) && (
        <div>
          <h4 className="entry-section-title">
            <span className="entry-section-title-icon">📊</span>
            Metrics
          </h4>
          <ul className="entry-metrics-list">
            {entry.metrics.hoursSpent !== undefined && (
              <li className="entry-metric-item"><strong>Hours Spent:</strong> {entry.metrics.hoursSpent}</li>
            )}
            {entry.metrics.tasksCompleted !== undefined && (
              <li className="entry-metric-item"><strong>Tasks Completed:</strong> {entry.metrics.tasksCompleted}</li>
            )}
          </ul>
        </div>
      )}

      {entry.struggles && (
        <div>
          <h4 className="entry-section-title">
            <span className="entry-section-title-icon">⚠️</span>
            Struggles
          </h4>
          <p className="entry-content">{entry.struggles}</p>
        </div>
      )}

      {entry.learnings && (
        <div>
          <h4 className="entry-section-title">
            <span className="entry-section-title-icon">💡</span>
            Learnings
          </h4>
          <p className="entry-content">{entry.learnings}</p>
        </div>
      )}

      {entry.tactics && (
        <div>
          <h4 className="entry-section-title">
            <span className="entry-section-title-icon">🎯</span>
            Tactics for Next Time
          </h4>
          <p className="entry-content">{entry.tactics}</p>
        </div>
      )}

      <div className="entry-social-interactions">
        <button onClick={handleLike} className="social-button like-button">
          Like
        </button>
        <span className="like-counter">{likes}</span>
        <button onClick={handleComment} className="social-button comment-button">
          Comment
        </button>
        <button onClick={handleShare} className="social-button share-button">
          Share
        </button>
      </div>
    </div>
  );
};

export default DiaryEntry;
