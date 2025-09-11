
import React, { useState } from 'react';
import { NavLink, useNavigate, Outlet } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { useToast } from '@/components/ui/use-toast';
import { LayoutDashboard, User, Award, Star, GitBranch, Settings, LogOut, Trophy, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import EnergikoPanda from '@/components/EnergikoPanda';


const Logo = () => (
    <div className="flex items-center gap-3 px-2">
        <EnergikoPanda pandaType="logo" size="small" isStatic={true} />
        <span className="text-2xl font-bold gradient-text">ConnectONE</span>
    </div>
);

const SidebarContent = ({ onLinkClick }) => {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const { stats } = useData();
  const { toast } = useToast();

  const handleLogout = async () => {
    if (onLinkClick) onLinkClick();
    await signOut();
    toast({
      title: "Sesión cerrada",
      description: "¡Hasta pronto! Enérgiko te estará esperando."
    });
    navigate('/');
  };

  const navItems = [
    { to: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" />, text: 'Panel' },
    { to: '/progress', icon: <GitBranch className="w-5 h-5" />, text: 'Mapa de Progreso' },
    { to: '/levels', icon: <Star className="w-5 h-5" />, text: 'Niveles' },
    { to: '/achievements', icon: <Award className="w-5 h-5" />, text: 'Logros' },
    { to: '/challenges', icon: <Trophy className="w-5 h-5" />, text: 'Retos Semanales' },
    { to: '/profile', icon: <User className="w-5 h-5" />, text: 'Mi Perfil' },
  ];
  
  const PandoCoins = stats ? (stats.level * 100) + (stats.streak * 20) + (stats.achievements_unlocked * 50) : 0;

  return (
    <div className="bg-gray-900 text-white h-full flex flex-col justify-between p-4">
      <div>
        <div className="mb-8">
          <Logo />
        </div>
        <nav className="flex flex-col gap-2">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onLinkClick}
              className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-primary/20 active:scale-95 ${
                  isActive
                  ? 'bg-primary/20 text-primary font-semibold'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {item.icon}
              <span>{item.text}</span>
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="flex flex-col gap-2">
        <div className="bg-gray-800 px-3 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 text-center">
          <span className="text-yellow-400">🐼©</span>
          <span className="text-white">{PandoCoins}</span>
        </div>
        <NavLink to="/settings" onClick={onLinkClick} className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-primary/20 active:scale-95">
          <Settings className="w-5 h-5" />
          Configuración
        </NavLink>
        <Button variant="ghost" onClick={handleLogout} className="text-gray-300 hover:text-white justify-start gap-3 hover:bg-primary/20 active:scale-95">
          <LogOut className="w-5 h-5" />
          Cerrar Sesión
        </Button>
      </div>
    </div>
  );
};


const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();
  const { profile } = useData();
  const navigate = useNavigate();
  
  const userInitial = user?.email ? user.email.charAt(0).toUpperCase() : 'U';

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="w-64 hidden md:block fixed h-full border-r border-border bg-gray-900 z-40">
        <SidebarContent />
      </aside>

      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 z-40 md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
              className="fixed top-0 left-0 h-full w-64 z-50 md:hidden"
            >
              <SidebarContent onLinkClick={() => setSidebarOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="flex-1 md:ml-64 flex flex-col">
        <header className="sticky top-0 h-16 bg-background/80 backdrop-blur-md shadow-sm border-b border-border z-30 flex items-center justify-between px-4 md:justify-end">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-foreground hover:bg-primary/20"
            onClick={() => setSidebarOpen(true)}
            aria-label="Abrir menú"
          >
            <Menu />
          </Button>
          <div className="flex items-center gap-4">
            <span className="text-foreground font-medium text-sm hidden sm:block">{user?.email}</span>
            <div onClick={() => navigate('/profile')} className="cursor-pointer">
              <Avatar>
                <AvatarImage src={profile?.avatar_url} alt="Avatar de usuario" />
                <AvatarFallback>{userInitial}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 relative">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
