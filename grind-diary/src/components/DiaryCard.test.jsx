import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import DiaryCard from './DiaryCard'; // Adjust path as necessary

describe('DiaryCard', () => {
  const mockEntry = {
    id: '1',
    content: 'This is a test diary entry content.',
    metrics: 'Key Metric: Value',
    timestamp: new Date().toISOString(),
  };

  it('should render the diary entry content', () => {
    render(<DiaryCard entry={mockEntry} />);
    // Check for the content itself
    expect(screen.getByText(mockEntry.content, { exact: false })).toBeInTheDocument();
  });

  it('should render the diary entry metrics if provided', () => {
    render(<DiaryCard entry={mockEntry} />);
    // Check for the metrics
    expect(screen.getByText(mockEntry.metrics, { exact: false })).toBeInTheDocument();
  });

  it('should render the formatted timestamp if provided', () => {
    render(<DiaryCard entry={mockEntry} />);
    const expectedDateString = new Date(mockEntry.timestamp).toLocaleDateString();
    // Check for the timestamp (formatted)
    expect(screen.getByText(`Logged on: ${expectedDateString}`, { exact: false })).toBeInTheDocument();
  });

  it('should not render metrics if metrics are not provided', () => {
    const entryWithoutMetrics = { ...mockEntry, metrics: null };
    render(<DiaryCard entry={entryWithoutMetrics} />);
    // Ensure "Metrics:" label or the metrics value itself is not present
    // A more robust way might be to query for a specific element/class that wraps metrics
    expect(screen.queryByText('Metrics:', { exact: false })).not.toBeInTheDocument();
    expect(screen.queryByText(mockEntry.metrics, { exact: false })).not.toBeInTheDocument();
  });
  
  it('should not render timestamp if timestamp is not provided', () => {
    const entryWithoutTimestamp = { ...mockEntry, timestamp: null };
    render(<DiaryCard entry={entryWithoutTimestamp} />);
    expect(screen.queryByText(/Logged on:/i)).not.toBeInTheDocument();
  });
});
