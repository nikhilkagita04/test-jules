import React, { useState } from 'react';

export default function CreateDiaryEntryPage() {
  const [content, setContent] = useState('');
  const [metrics, setMetrics] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Diary Entry:', { content, metrics });
    // Later, this will call a service to save the entry
    setContent('');
    setMetrics('');
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    maxWidth: '600px', // Limit form width for better readability
    margin: '0 auto', // Center form on the page
  };

  const labelStyle = {
    marginBottom: '5px',
    fontWeight: 'bold',
    display: 'block', // Ensure label takes full width
  };

  const inputStyle = {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    width: '100%', // Make inputs take full width of their container
    boxSizing: 'border-box', // Include padding and border in the element's total width and height
  };

  const textareaStyle = {
    ...inputStyle, // Inherit common input styles
    minHeight: '100px', // Set a minimum height for textarea
    resize: 'vertical', // Allow vertical resizing
  };

  const buttonStyle = {
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#007bff', // Using color from global styles
    color: 'white',
    cursor: 'pointer',
    fontSize: '1em',
    fontWeight: '500',
    transition: 'background-color 0.2s ease',
  };

  // Hover effect will be managed with onMouseOver/onMouseOut for inline styles
  // For a real app, CSS classes would be better for :hover

  return (
    <div style={{ padding: '20px' }}> {/* Added padding around the page content */}
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Create Diary Entry</h1>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div>
          <label htmlFor="diaryContent" style={labelStyle}>Content:</label>
          <textarea
            id="diaryContent"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={textareaStyle}
            required
          />
        </div>
        <div>
          <label htmlFor="keyMetrics" style={labelStyle}>Key Metrics (optional):</label>
          <input
            type="text"
            id="keyMetrics"
            value={metrics}
            onChange={(e) => setMetrics(e.target.value)}
            style={inputStyle}
          />
        </div>
        <button
          type="submit"
          style={buttonStyle}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
        >
          Submit Entry
        </button>
      </form>
    </div>
  );
}
