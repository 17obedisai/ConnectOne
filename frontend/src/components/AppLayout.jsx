import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, Outlet } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { useToast } from '@/components/ui/use-toast';
import { 
  LayoutDashboard, User, Award, Star, GitBranch, Settings, 
  LogOut, Menu, Target, Sparkles, Zap, Activity, ChevronRight, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import EnergikoPanda from '@/components/EnergikoPanda';

const Logo = () => {
  const [sparkle, setSparkle] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setSparkle((prev) => (prev + 1) % 3);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      className="flex items-center gap-2 px-3 py-2"
      whileHover={{ scale: 1.02 }}
    >
      <div className="relative">
        <motion.div
          animate={{ rotate: sparkle * 120 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="absolute inset-0 bg-gradient-to-br from-orange-400/30 to-pink-400/30 rounded-full blur-xl"
        />
        <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
          <EnergikoPanda pandaType="logo" size="small" isStatic={true} />
        </div>
      </div>
      
      <motion.div className="flex items-center gap-1">
        <span className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
          ConnectONE
        </span>
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            repeatDelay: 2
          }}
        >
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const SidebarContent = ({ onLinkClick, isMobile = false }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { stats } = useData();
  const { toast } = useToast();
  const [hoveredItem, setHoveredItem] = useState(null);
  const [activeGlow, setActiveGlow] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveGlow(prev => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = async () => {
    if (onLinkClick) onLinkClick();
    logout();
    toast({
      title: "¡Hasta pronto!",
      description: "Energiko te esperará para continuar tu viaje 🐼"
    });
    navigate('/');
  };

  const navItems = [
    { 
      to: '/dashboard', 
      icon: <LayoutDashboard className="w-4 h-4 sm:w-5 sm:h-5" />, 
      text: 'Panel',
      color: 'from-purple-500 to-indigo-600',
      emoji: '🏠'
    },
    { 
      to: '/missions', 
      icon: <Target className="w-4 h-4 sm:w-5 sm:h-5" />, 
      text: 'Misiones',
      color: 'from-blue-500 to-cyan-600',
      emoji: '🎯'
    },
    { 
      to: '/map', 
      icon: <GitBranch className="w-4 h-4 sm:w-5 sm:h-5" />, 
      text: 'Mapa de Progreso',
      color: 'from-green-500 to-emerald-600',
      emoji: '🗺️'
    },
    { 
      to: '/levels', 
      icon: <Star className="w-4 h-4 sm:w-5 sm:h-5" />, 
      text: 'Niveles',
      color: 'from-yellow-500 to-amber-600',
      emoji: '⭐'
    },
    { 
      to: '/achievements', 
      icon: <Award className="w-4 h-4 sm:w-5 sm:h-5" />, 
      text: 'Logros',
      color: 'from-orange-500 to-red-600',
      emoji: '🏆'
    },
    { 
      to: '/profile', 
      icon: <User className="w-4 h-4 sm:w-5 sm:h-5" />, 
      text: 'Mi Perfil',
      color: 'from-pink-500 to-rose-600',
      emoji: '👤'
    },
  ];

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-slate-900 via-purple-900/95 to-indigo-950">
      {/* Header con logo y botón cerrar en móvil */}
      <div className="border-b border-purple-500/30 pb-3 sm:pb-4 mb-4 sm:mb-6">
        <div className="flex items-center justify-between">
          <Logo />
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onLinkClick}
              className="text-white hover:bg-purple-600/30 mr-2"
            >
              <X className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>

      {/* Navegación principal */}
      <nav className="flex-1 px-2 sm:px-3 space-y-1 sm:space-y-2 overflow-y-auto">
        {navItems.map((item, index) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onLinkClick}
            onMouseEnter={() => setHoveredItem(item.to)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            {({ isActive }) => (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  relative group rounded-lg sm:rounded-xl transition-all duration-300 overflow-hidden
                  ${isActive 
                    ? 'shadow-lg shadow-purple-500/30' 
                    : 'hover:shadow-md hover:shadow-purple-500/20'}
                `}
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  animate={isActive ? { opacity: 1 } : {}}
                />
                
                {isActive && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: [-200, 200] }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                  />
                )}

                <div className={`
                  relative flex items-center gap-2 sm:gap-3 px-3 py-2 sm:px-4 sm:py-3
                  ${isActive ? 'text-white' : 'text-purple-200 group-hover:text-white'}
                `}>
                  <motion.span
                    className="text-base sm:text-xl flex-shrink-0"
                    animate={hoveredItem === item.to ? { rotate: [0, -10, 10, -10, 0] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    {item.emoji}
                  </motion.span>
                  
                  <motion.div
                    className="flex-shrink-0"
                    animate={isActive && activeGlow ? { scale: [1, 1.1, 1] } : {}}
                  >
                    {item.icon}
                  </motion.div>
                  
                  <span className="font-medium flex-1 text-sm sm:text-base truncate">{item.text}</span>
                  
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      className="flex-shrink-0"
                    >
                      <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    </motion.div>
                  )}

                  {hoveredItem === item.to && !isActive && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="flex-shrink-0"
                    >
                      <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-2 sm:p-3 space-y-1 sm:space-y-2 border-t border-purple-500/30">
        <Button 
          variant="ghost" 
          onClick={() => { navigate('/settings'); if (onLinkClick) onLinkClick(); }} 
          className="w-full justify-start text-purple-200 hover:text-white hover:bg-purple-800/40 h-9 sm:h-10 text-sm sm:text-base"
        >
          <Settings className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          Configuración
        </Button>
        
        <Button 
          variant="ghost" 
          onClick={handleLogout} 
          className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/20 group h-9 sm:h-10 text-sm sm:text-base"
        >
          <LogOut className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:rotate-12 transition-transform" />
          Cerrar Sesión
        </Button>
      </div>
    </div>
  );
};

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();
  const { profile, stats } = useData();
  const navigate = useNavigate();
  
  const userInitial = user?.email ? user.email.charAt(0).toUpperCase() : 'U';

  // Cerrar sidebar al cambiar de ruta en móvil
  useEffect(() => {
    setSidebarOpen(false);
  }, [window.location.pathname]);

  // Prevenir scroll del body cuando sidebar móvil está abierto
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [sidebarOpen]);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900">
      {/* Sidebar Desktop - Siempre visible en pantallas grandes */}
      <aside className="w-64 lg:w-72 hidden lg:block fixed h-full border-r border-purple-500/20 z-40 shadow-2xl shadow-purple-500/20">
        <SidebarContent isMobile={false} />
      </aside>

      {/* Sidebar Móvil con Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Overlay oscuro */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            
            {/* Sidebar móvil */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 h-full w-64 sm:w-72 z-[101] lg:hidden shadow-2xl"
            >
              <SidebarContent isMobile={true} onLinkClick={() => setSidebarOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Contenedor principal */}
      <div className="flex-1 lg:ml-64 xl:ml-72 flex flex-col min-h-screen">
        {/* Header - SIEMPRE VISIBLE EN MÓVIL */}
        <header className="sticky top-0 h-14 sm:h-16 bg-slate-900/95 backdrop-blur-xl border-b border-purple-500/20 z-50 flex items-center justify-between px-3 sm:px-4 shadow-lg">
          {/* Botón hamburguesa - SOLO en móvil */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-white hover:bg-purple-600/30 flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
          </Button>
          
          {/* Logo en móvil cuando sidebar está cerrado */}
          <div className="lg:hidden flex-1 flex justify-center">
            <span className="text-base sm:text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              ConnectONE
            </span>
          </div>
          
          {/* Stats y Avatar */}
          <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 ml-auto">
            <motion.div 
              className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-purple-800/30 rounded-full"
              whileHover={{ scale: 1.05 }}
            >
              <Activity className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400 flex-shrink-0" />
              <span className="text-white font-medium text-xs sm:text-sm whitespace-nowrap">
                XP: {stats?.xp || 0}
              </span>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/profile')} 
              className="cursor-pointer flex-shrink-0"
            >
              <Avatar className="border-2 border-purple-500/50 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10">
                <AvatarImage src={profile?.avatar_url} alt="Avatar" />
                <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white font-bold text-xs sm:text-sm">
                  {userInitial}
                </AvatarFallback>
              </Avatar>
            </motion.div>
          </div>
        </header>

        {/* Contenido Principal */}
        <main className="flex-1 p-3 sm:p-4 md:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;