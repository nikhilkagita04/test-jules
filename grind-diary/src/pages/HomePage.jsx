import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDiaryEntries } from '../services/diaryService';
import DiaryCard from '../components/DiaryCard';

export default function HomePage() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        setLoading(true);
        const fetchedEntries = await getDiaryEntries();
        setEntries(fetchedEntries);
      } catch (error) {
        console.error("Error fetching diary entries:", error);
        // Handle error appropriately in a real app
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, []);

  const navStyles = {
    marginBottom: '20px',
    paddingBottom: '10px',
    borderBottom: '1px solid #eee',
  };

  const ulStyles = {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    gap: '15px',
  };

  const linkStyles = {
    textDecoration: 'none',
    color: '#007bff',
    fontWeight: '500',
    padding: '8px 12px',
    borderRadius: '4px',
    transition: 'background-color 0.3s ease, color 0.3s ease',
  };

  const linkHoverStyles = { // Note: Inline styles can't directly do pseudo-classes like :hover
    // For :hover, you'd typically use CSS classes or styled-components.
    // This is a placeholder for where you might change style on interaction via JS if needed.
  };


  return (
    <div>
      <h1>Home Page - Diary Entries</h1>
      <nav style={navStyles}>
        <ul style={ulStyles}>
          <li>
            <Link to="/create-entry" style={linkStyles}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e9ecef'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >Create New Diary Entry</Link>
          </li>
          <li>
            <Link to="/profile" style={linkStyles}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e9ecef'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >View Profile</Link>
          </li>
        </ul>
      </nav>
      {loading ? (
        <p>Loading entries...</p>
      ) : entries.length === 0 ? (
        <p>No diary entries yet. <Link to="/create-entry">Create one!</Link></p>
      ) : (
        <div>
          {entries.map(entry => (
            <DiaryCard key={entry.id} entry={entry} />
          ))}
        </div>
      )}
    </div>
  );
}
