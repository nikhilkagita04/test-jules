import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// Mock child components to isolate App component's logic
jest.mock('./components/DiaryFeed', () => () => <div data-testid="diary-feed">DiaryFeed Component</div>);
jest.mock('./components/AddEntryForm', () => ({ onNewEntry }) => (
  <div data-testid="add-entry-form">
    AddEntryForm Component
    <button onClick={() => onNewEntry({ id: 'new-test-entry', title: 'New Test Entry' })}>
      Simulate Add Entry
    </button>
  </div>
));

describe('App Component', () => {
  test('renders DiaryFeed and "Add New Grind" button by default', () => {
    render(<App />);
    expect(screen.getByTestId('diary-feed')).toBeInTheDocument();
    expect(screen.getByText('Add New Grind')).toBeInTheDocument();
    expect(screen.queryByTestId('add-entry-form')).not.toBeInTheDocument();
    expect(screen.queryByText('Back to Feed')).not.toBeInTheDocument();
  });

  test('clicking "Add New Grind" button shows AddEntryForm and "Back to Feed" button', () => {
    render(<App />);
    
    // Click "Add New Grind" button
    const addNewGrindButton = screen.getByText('Add New Grind');
    fireEvent.click(addNewGrindButton);
    
    expect(screen.getByTestId('add-entry-form')).toBeInTheDocument();
    expect(screen.getByText('Back to Feed')).toBeInTheDocument();
    expect(screen.queryByTestId('diary-feed')).not.toBeInTheDocument();
    expect(screen.queryByText('Add New Grind')).not.toBeInTheDocument();
  });

  test('clicking "Back to Feed" button shows DiaryFeed and "Add New Grind" button', () => {
    render(<App />);
    
    // First, go to the form view
    const addNewGrindButton = screen.getByText('Add New Grind');
    fireEvent.click(addNewGrindButton);
    
    // Now, click "Back to Feed" button
    const backToFeedButton = screen.getByText('Back to Feed');
    fireEvent.click(backToFeedButton);
    
    expect(screen.getByTestId('diary-feed')).toBeInTheDocument();
    expect(screen.getByText('Add New Grind')).toBeInTheDocument();
    expect(screen.queryByTestId('add-entry-form')).not.toBeInTheDocument();
    expect(screen.queryByText('Back to Feed')).not.toBeInTheDocument();
  });

  test('adding a new entry via form switches back to DiaryFeed view', () => {
    render(<App />);
    
    // Go to the form view
    const addNewGrindButton = screen.getByText('Add New Grind');
    fireEvent.click(addNewGrindButton);
    
    // Simulate adding a new entry (using the button inside the mocked AddEntryForm)
    // This also tests that onNewEntry callback switches the view
    const simulateAddEntryButton = screen.getByText('Simulate Add Entry');
    fireEvent.click(simulateAddEntryButton);

    // Should be back to DiaryFeed view
    expect(screen.getByTestId('diary-feed')).toBeInTheDocument();
    expect(screen.getByText('Add New Grind')).toBeInTheDocument();
    expect(screen.queryByTestId('add-entry-form')).not.toBeInTheDocument();
  });
});
