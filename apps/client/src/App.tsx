import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { BookingPage } from './pages/BookingPage';
import { DashboardPage } from './pages/DashboardPage';
import { EventsPage } from './pages/EventsPage';
import { StaffLayout } from './components/layouts/StaffLayout';
import { StaffDashboard } from './pages/staff/StaffDashboard';
import { POSPage } from './pages/staff/POSPage';

import { AnalyticsDashboard } from './pages/admin/AnalyticsDashboard';

function App() {
    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="signup" element={<SignupPage />} />
                    <Route path="book" element={<BookingPage />} />
                    <Route path="dashboard" element={<DashboardPage />} />
                    <Route path="events" element={<EventsPage />} />
                    <Route path="membership" element={<div className="p-10 text-center">Membership Page Coming Soon</div>} />
                </Route>

                {/* Staff Routes */}
                <Route path="/staff" element={<StaffLayout />}>
                    <Route index element={<StaffDashboard />} />
                    <Route path="pos" element={<POSPage />} />
                    <Route path="analytics" element={<AnalyticsDashboard />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
