import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Though not strictly needed if no links from here yet
import { getDiaryEntries } from '../services/diaryService';
import DiaryCard from '../components/DiaryCard';

export default function ProfilePage() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  // const { userId } = useParams(); // For later when we have user-specific entries

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        setLoading(true);
        // Later, filter by userId: const fetchedEntries = await getDiaryEntriesForUser(userId);
        const fetchedEntries = await getDiaryEntries(); // For now, get all entries
        setEntries(fetchedEntries);
      } catch (error) {
        console.error("Error fetching diary entries for profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, []); // Add userId to dependency array later: [userId]

  return (
    <div>
      <h1>Profile Page - My Entries</h1>
      {/* Add navigation or user info here later */}
      {loading ? (
        <p>Loading entries...</p>
      ) : entries.length === 0 ? (
        <p>No diary entries found for this profile. <Link to="/create-entry">Create one!</Link></p>
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
