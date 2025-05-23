// DiaryCard.jsx
const DiaryCard = ({ entry }) => {
  const cardStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    margin: '16px 0', // Vertical margin, horizontal handled by container
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    backgroundColor: '#fff', // White background for the card
  };

  const contentStyle = {
    marginBottom: '12px',
    lineHeight: '1.6',
  };

  const metricsStyle = {
    fontSize: '0.9em',
    color: '#555',
    fontStyle: 'italic',
  };

  return (
    <div style={cardStyle}>
      <div style={contentStyle}>
        <strong>Content:</strong>
        <p style={{ marginTop: '4px', whiteSpace: 'pre-wrap' }}>{entry.content}</p>
      </div>
      {entry.metrics && ( // Only display metrics if they exist
        <div style={metricsStyle}>
          <strong>Metrics:</strong>
          <p style={{ marginTop: '4px' }}>{entry.metrics}</p>
        </div>
      )}
      {/* Optionally, add a timestamp later */}
      {entry.timestamp && (
        <p style={{ fontSize: '0.8em', color: '#777', marginTop: '10px', textAlign: 'right' }}>
          Logged on: {new Date(entry.timestamp).toLocaleDateString()}
        </p>
      )}
    </div>
  );
};
export default DiaryCard;
