import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider, useAuth } from '@/contexts/AuthContext'; // AÑADIR useAuth AQUÍ
import { DataProvider } from '@/contexts/DataContext';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';

// Páginas públicas
import LandingPage from '@/pages/LandingPage';
import AuthPage from '@/pages/AuthPage';
import LoginPage from '@/pages/LoginPage';

// Páginas protegidas
import AppLayout from '@/components/AppLayout';
import QuestionnairePage from '@/pages/QuestionnairePage';
import DashboardPage from '@/pages/DashboardPage';
import ProfilePage from '@/pages/ProfilePage';
import SettingsPage from '@/pages/SettingsPage';
import MissionsPage from '@/pages/MissionsPage';
import MissionPage from '@/pages/MissionPage';
import AchievementsPage from '@/pages/AchievementsPage';
import ProgressMapPage from '@/pages/ProgressMapPage';
import LevelsPage from '@/pages/LevelsPage';

// Componente PrivateRoute DEBE estar DENTRO del AuthProvider para poder usar useAuth
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Cargando...</div>;
  }
  return user ? children : <Navigate to="/login" />;
};

// Componente interno que usa los hooks
const AppRoutes = () => {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/login" element={<LoginPage />} />
      
      {/* Rutas protegidas con layout */}
      <Route element={<PrivateRoute><AppLayout /></PrivateRoute>}>
        <Route path="/onboarding" element={<QuestionnairePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/progress" element={<ProgressMapPage />} />
        <Route path="/levels" element={<LevelsPage />} />
        <Route path="/achievements" element={<AchievementsPage />} />
        <Route path="/missions" element={<MissionsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/mission/:id" element={<MissionPage />} />
      </Route>
    </Routes>
  );
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
      
      <AuthProvider>
        <DndProvider backend={backend} options={{ enableMouseEvents: true }}>
          <Router>
            <DataProvider>
              <div className="min-h-screen bg-background text-foreground">
                <AppRoutes />
                <Toaster />
              </div>
            </DataProvider>
          </Router>
        </DndProvider>
      </AuthProvider>
    </>
  );
}

export default App;