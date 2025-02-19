import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <Router>
      <div className="App">
        <main className="p-8">
          <Routes>
            <Route path="register" element={<Register />} />
            <Route path="profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
