import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './components/store/Store';
import Navbar from './components/Navbar';
import HomePage from './pages/Home/HomePage'
// import AdminDashboard from './pages/admin/AdminDashBoard';
// import Register from './pages/Register/index';
// import AboutUs from './pages/AboutUs/index';
// import VotingPage from './pages/Voting/index'; 
// import Category from './pages/Category/index';


function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage/>} />
            {/* <Route path="/vote" element={<VotingPage/>} />
            <Route path="/category" element={<Category/>}/>
            <Route path="/gallery" element={<div className="p-8">Gallery Page</div>} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/faqs" element={<div className="p-8">FAQs Page</div>} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<AdminDashboard />} /> */}
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;