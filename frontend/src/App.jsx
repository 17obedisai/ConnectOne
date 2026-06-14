import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async'; // ✅ Cambiar a async
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
import InstallPWA from '@/components/InstallPWA';
import DashboardPage from '@/pages/DashboardPage';
import ProfilePage from '@/pages/ProfilePage';
import SettingsPage from '@/pages/SettingsPage';
import MissionsPage from '@/pages/MissionsPage';
import MissionPage from '@/pages/MissionPage';
import LevelsPage from '@/pages/LevelsPage';
import SkillTreePage from '@/pages/SkillTreePage';
import FinanzasPage from '@/pages/FinanzasPage';
import NotasPage from '@/pages/NotasPage';
import AcademiaPage from '@/pages/AcademiaPage';
import CursoPage from '@/pages/CursoPage';
import SeguimientoPage from '@/pages/SeguimientoPage';

// ✅ Componente PrivateRoute
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

// ✅ Componente interno que usa los hooks
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
        <Route path="/levels" element={<LevelsPage />} />
        <Route path="/missions" element={<MissionsPage />} />
        <Route path="/skilltree" element={<SkillTreePage />} />
        <Route path="/finanzas" element={<FinanzasPage />} />
        <Route path="/notas" element={<NotasPage />} />
        <Route path="/academia" element={<AcademiaPage />} />
        <Route path="/academia/:id" element={<CursoPage />} />
        <Route path="/seguimiento" element={<SeguimientoPage />} />
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
    // ✅ Usar HelmetProvider en vez de solo Helmet
    <HelmetProvider>
      <AuthProvider>
        <DndProvider backend={backend} options={{ enableMouseEvents: true }}>
          {/* ✅ Router con future flags para evitar warnings */}
          <Router 
            future={{ 
              v7_startTransition: true,
              v7_relativeSplatPath: true 
            }}
          >
            <DataProvider>
              <div className="min-h-screen bg-background text-foreground">
                <AppRoutes />
                <Toaster />
                <InstallPWA />
              </div>
            </DataProvider>
          </Router>
        </DndProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;