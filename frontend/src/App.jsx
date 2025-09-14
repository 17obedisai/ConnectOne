import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import LandingPage from '@/pages/LandingPage';
import AuthPage from '@/pages/AuthPage';
import LoginPage from '@/pages/LoginPage';
import QuestionnairePage from '@/pages/QuestionnairePage';
import ProfilePage from '@/pages/ProfilePage';
import DashboardPage from '@/pages/DashboardPage';
import SettingsPage from '@/pages/SettingsPage';
import MissionPage from '@/pages/MissionPage';
import AchievementsPage from '@/pages/AchievementsPage';
import ProgressPage from '@/pages/ProgressPage';
import LevelsPage from '@/pages/LevelsPage';
import ChallengesPage from '@/pages/ChallengesPage';
import { useAuth } from '@/contexts/AuthContext';
import { DataProvider } from '@/contexts/DataContext';
import AppLayout from '@/components/AppLayout';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Cargando...</div>;
  }
  return user ? children : <Navigate to="/login" />;
};

function App() {
  const isMobile = 'ontouchstart' in window;
  const backend = isMobile ? TouchBackend : HTML5Backend;

  return (
    <>
      <Helmet>
        <title>ConnectONE - Reconéctate contigo mismo</title>
        <meta name="description" content="ConnectONE es tu compañero digital interactivo" />
      </Helmet>
      
      <DndProvider backend={backend} options={{ enableMouseEvents: true }}>
        <Router>
          <DataProvider>
            <div className="min-h-screen bg-background text-foreground">
              <Routes>
                {/* Rutas públicas */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/login" element={<LoginPage />} />
                
                {/* Rutas protegidas */}
                <Route element={<PrivateRoute><AppLayout /></PrivateRoute>}>
                  <Route path="/onboarding" element={<QuestionnairePage />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/progress" element={<ProgressPage />} />
                  <Route path="/levels" element={<LevelsPage />} />
                  <Route path="/achievements" element={<AchievementsPage />} />
                  <Route path="/challenges" element={<ChallengesPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                  <Route path="/mission/:id" element={<MissionPage />} />
                </Route>
              </Routes>
              <Toaster />
            </div>
          </DataProvider>
        </Router>
      </DndProvider>
    </>
  );
}

export default App;