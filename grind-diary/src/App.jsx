import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CreateDiaryEntryPage from './pages/CreateDiaryEntryPage';
import ProfilePage from './pages/ProfilePage'; // Import ProfilePage
import './App.css';

function App() {
  const mainContainerStyle = {
    maxWidth: '1200px', // Max width for the content area
    margin: '0 auto',   // Center the container on the page
    padding: '20px',    // Padding around the content
    minHeight: 'calc(100vh - 40px)', // Ensure it takes full viewport height minus padding
    backgroundColor: '#fff', // Optional: if you want a white content box on a gray body
    boxShadow: '0 0 10px rgba(0,0,0,0.05)', // Optional: subtle shadow for the container
  };

  return (
    <Router>
      <div style={mainContainerStyle}> {/* Wrap routes in the styled container */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/create-entry" element={<CreateDiaryEntryPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          {/* Later, use /profile/:userId for user-specific profiles */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
