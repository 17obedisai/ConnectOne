import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { DataProvider } from '@/contexts/DataContext';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';

// Páginas públicas
import LandingPage from '@/pages/LandingPage';
import AuthPage from '@/pages/AuthPage';
import QuestionnairePage from '@/pages/QuestionnairePage';
import NotFoundPage from '@/pages/NotFoundPage';

// Páginas protegidas
import AppLayout from '@/components/AppLayout';
import DashboardPage from '@/pages/DashboardPage';
import ProfilePage from '@/pages/ProfilePage';
import SettingsPage from '@/pages/SettingsPage';
import MissionsPage from '@/pages/MissionsPage';
import MissionPage from '@/pages/MissionPage';
import AchievementsPage from '@/pages/AchievementsPage';
import ProgressMapPage from '@/pages/ProgressMapPage';
import LevelsPage from '@/pages/LevelsPage';

// Componente PrivateRoute
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-white text-xl">Cargando...</div>
      </div>
    );
  }
  
  return user ? children : <Navigate to="/auth" />;
};

// Componente interno que usa los hooks
const AppRoutes = () => {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/login" element={<Navigate to="/auth" />} />
      <Route path="/register" element={<Navigate to="/auth" />} />
      <Route path="/questionnaire" element={<QuestionnairePage />} />
      
      {/* Rutas protegidas con layout */}
      <Route element={<PrivateRoute><AppLayout /></PrivateRoute>}>
        <Route path="/onboarding" element={<QuestionnairePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/map" element={<ProgressMapPage />} />
        <Route path="/levels" element={<LevelsPage />} />
        <Route path="/achievements" element={<AchievementsPage />} />
        <Route path="/missions" element={<MissionsPage />} />
        <Route path="/mission/:id" element={<MissionPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
      
      {/* Ruta 404 - debe ir al final */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

function App() {
  const isMobile = 'ontouchstart' in window;
  const backend = isMobile ? TouchBackend : HTML5Backend;

  return (
    <>
      <Helmet>
        <title>ConnectONE - Transforma tu vida</title>
        <meta name="description" content="Gamifica tu bienestar con ConnectONE" />
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