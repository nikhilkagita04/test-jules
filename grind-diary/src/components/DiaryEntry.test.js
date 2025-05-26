import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DiaryEntry from './DiaryEntry';

const mockEntry = {
  id: 'test-1',
  author: 'Test Author',
  timestamp: new Date().toISOString(),
  title: 'Test Entry Title',
  updateText: 'This is a test update.',
  metrics: { hoursSpent: 2, tasksCompleted: 1 },
  struggles: 'Testing can be a struggle.',
  learnings: 'Learned a lot from testing.',
  tactics: 'Mock everything.'
};

describe('DiaryEntry Component', () => {
  test('renders social interaction buttons', () => {
    render(<DiaryEntry entry={mockEntry} />);
    expect(screen.getByText('Like')).toBeInTheDocument();
    expect(screen.getByText('Comment')).toBeInTheDocument();
    expect(screen.getByText('Share')).toBeInTheDocument();
  });

  test('like button functionality', () => {
    render(<DiaryEntry entry={mockEntry} />);
    
    // Check initial likes
    // More specific selector for the like counter
    expect(screen.getByText('0', { selector: 'span.like-counter' })).toBeInTheDocument();

    // Click like button
    const likeButton = screen.getByText('Like');
    fireEvent.click(likeButton);

    // Check updated likes
    expect(screen.getByText('1', { selector: 'span.like-counter' })).toBeInTheDocument();

    // Click again
    fireEvent.click(likeButton);
    expect(screen.getByText('2', { selector: 'span.like-counter' })).toBeInTheDocument();
  });

  test('comment button logs to console', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    render(<DiaryEntry entry={mockEntry} />);
    
    const commentButton = screen.getByText('Comment');
    fireEvent.click(commentButton);
    
    expect(consoleSpy).toHaveBeenCalledWith('Comment button clicked');
    consoleSpy.mockRestore();
  });

  test('share button logs to console', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    render(<DiaryEntry entry={mockEntry} />);
    
    const shareButton = screen.getByText('Share');
    fireEvent.click(shareButton);
    
    expect(consoleSpy).toHaveBeenCalledWith('Share button clicked');
    consoleSpy.mockRestore();
  });

  test('renders correctly when no entry data is provided', () => {
    render(<DiaryEntry entry={null} />);
    expect(screen.getByText('No entry data provided.')).toBeInTheDocument();
  });
  
  test('renders correctly with minimal entry data', () => {
    const minimalEntry = { id: 'min-1', title: 'Minimal Test' };
    render(<DiaryEntry entry={minimalEntry} />);
    expect(screen.getByText('Minimal Test')).toBeInTheDocument();
    // Check that social buttons are still there
    expect(screen.getByText('Like')).toBeInTheDocument();
    expect(screen.getByText('0', { selector: 'span.like-counter' })).toBeInTheDocument(); // Like counter
  });
});
