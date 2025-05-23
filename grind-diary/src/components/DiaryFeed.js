import React from 'react';
import DiaryEntry from './DiaryEntry';
import './DiaryFeed.css'; // Import the CSS file

const DiaryFeed = ({ entries }) => {
  if (!entries) {
    return (
      <div className="diary-feed">
        <h2 className="feed-title">My Grind Diary</h2>
        <p className="feed-empty-message">Loading entries...</p>
      </div>
    );
  }

  return (
    <div className="diary-feed">
      <h2 className="feed-title">My Grind Diary</h2>
      {entries.length === 0 ? (
        <p className="feed-empty-message">No diary entries yet. Start grinding!</p>
      ) : (
        entries.map(entry => (
          <DiaryEntry key={entry.id} entry={entry} />
        ))
      )}
    </div>
  );
};

export default DiaryFeed;
