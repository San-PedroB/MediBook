import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './views/Login';
import UserRegister from './views/UserRegister';
import AdminDashboard from './views/AdminDashboard';
import CreateAgent from './views/CreateAgent';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './routes/PrivateRoute';
import Agents from './views/Agents';
import EditAgent from './views/EditAgent';


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="d-flex flex-column min-vh-100">
          <Navbar />
          <main className="flex-fill">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<UserRegister />} />
              <Route path="/admin-dashboard"
                element={
                  <PrivateRoute>
                    <AdminDashboard />
                  </PrivateRoute>
                }
              />
              <Route path="/agents"
                element={
                  <PrivateRoute>
                    <Agents />
                  </PrivateRoute>
                }
              />
              <Route path="/create-agent"
                element={
                  <PrivateRoute>
                    <CreateAgent />
                  </PrivateRoute>
                }
              />
              <Route path="/edit-agent/:id"
                element={
                  <PrivateRoute>
                    <EditAgent />
                  </PrivateRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
