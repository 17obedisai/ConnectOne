import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, Outlet } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { useToast } from '@/components/ui/use-toast';
import { 
  LayoutDashboard, User, Award, Star, GitBranch, Settings, 
  LogOut, Menu, Target, Sparkles, Zap, Activity, ChevronRight,
  Flame, Trophy
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
        <div className="relative w-10 h-10 flex items-center justify-center">
          <EnergikoPanda pandaType="logo" size="small" isStatic={true} />
        </div>
      </div>
      
      <motion.div className="flex items-center gap-1">
        <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
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
          <Sparkles className="w-5 h-5 text-yellow-400" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const SidebarContent = ({ onLinkClick }) => {
  const navigate = useNavigate();
  const { signOut } = useAuth();
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
    await signOut();
    toast({
      title: "¡Hasta pronto!",
      description: "Energiko te esperará para continuar tu viaje 🐼"
    });
    navigate('/');
  };

  const navItems = [
    { 
      to: '/dashboard', 
      icon: <LayoutDashboard className="w-5 h-5" />, 
      text: 'Panel',
      color: 'from-purple-500 to-indigo-600',
      emoji: '🏠'
    },
    { 
      to: '/missions', 
      icon: <Target className="w-5 h-5" />, 
      text: 'Misiones',
      color: 'from-blue-500 to-cyan-600',
      emoji: '🎯'
    },
    { 
      to: '/map', 
      icon: <GitBranch className="w-5 h-5" />, 
      text: 'Mapa de Progreso',
      color: 'from-green-500 to-emerald-600',
      emoji: '🗺️'
    },
    { 
      to: '/levels', 
      icon: <Star className="w-5 h-5" />, 
      text: 'Niveles',
      color: 'from-yellow-500 to-amber-600',
      emoji: '⭐'
    },
    { 
      to: '/achievements', 
      icon: <Award className="w-5 h-5" />, 
      text: 'Logros',
      color: 'from-orange-500 to-red-600',
      emoji: '🏆'
    },
    { 
      to: '/profile', 
      icon: <User className="w-5 h-5" />, 
      text: 'Mi Perfil',
      color: 'from-pink-500 to-rose-600',
      emoji: '👤'
    },
  ];
  
  const PandoCoins = stats ? (stats.level * 100) + (stats.streak * 20) + (stats.achievements_unlocked * 50) : 0;

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-slate-900 via-purple-900/95 to-indigo-950">
      {/* Header con logo animado */}
      <div className="border-b border-purple-500/30 pb-4 mb-6">
        <Logo />
      </div>

      {/* Navegación principal con animaciones */}
      <nav className="flex-1 px-3 space-y-2 overflow-y-auto">
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
                  relative group rounded-xl transition-all duration-300 overflow-hidden
                  ${isActive 
                    ? 'shadow-lg shadow-purple-500/30' 
                    : 'hover:shadow-md hover:shadow-purple-500/20'}
                `}
              >
                {/* Fondo con gradiente animado */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  animate={isActive ? { opacity: 1 } : {}}
                />
                
                {/* Efecto de brillo para item activo */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{
                      x: [-200, 200],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 2
                    }}
                  />
                )}

                {/* Contenido del item */}
                <div className={`
                  relative flex items-center gap-3 px-4 py-3
                  ${isActive ? 'text-white' : 'text-purple-200 group-hover:text-white'}
                `}>
                  <motion.span
                    className="text-xl"
                    animate={hoveredItem === item.to ? 
                      { rotate: [0, -10, 10, -10, 0] } : {}
                    }
                    transition={{ duration: 0.5 }}
                  >
                    {item.emoji}
                  </motion.span>
                  
                  <motion.div
                    animate={isActive && activeGlow ? 
                      { scale: [1, 1.1, 1] } : {}
                    }
                  >
                    {item.icon}
                  </motion.div>
                  
                  <span className="font-medium flex-1">{item.text}</span>
                  
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </motion.div>
                  )}

                  {hoveredItem === item.to && !isActive && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                    >
                      <Zap className="w-4 h-4 text-yellow-400" />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer con PandoCoins animadas */}
      <div className="p-3 space-y-2 border-t border-purple-500/30">
        <motion.div 
          className="relative overflow-hidden rounded-xl bg-gradient-to-r from-yellow-500/20 via-amber-500/20 to-yellow-500/20 p-3"
          whileHover={{ scale: 1.02 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-transparent"
            animate={{
              x: [-200, 200],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
            }}
          />
          <div className="relative flex items-center justify-center gap-2">
            <motion.span 
              className="text-2xl"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              🐼
            </motion.span>
            <span className="text-yellow-400 font-bold">©</span>
            <motion.span 
              className="text-white font-bold text-lg"
              key={PandoCoins}
              initial={{ scale: 1.5, color: "#fbbf24" }}
              animate={{ scale: 1, color: "#ffffff" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {PandoCoins}
            </motion.span>
          </div>
        </motion.div>
        
        <Button 
          variant="ghost" 
          onClick={() => navigate('/settings')} 
          className="w-full justify-start text-purple-200 hover:text-white hover:bg-purple-800/40"
        >
          <Settings className="w-5 h-5 mr-2" />
          Configuración
        </Button>
        
        <Button 
          variant="ghost" 
          onClick={handleLogout} 
          className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/20 group"
        >
          <LogOut className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
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

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900">
      {/* Sidebar Desktop */}
      <aside className="w-72 hidden md:block fixed h-full border-r border-purple-500/20 z-40 shadow-2xl shadow-purple-500/20">
        <SidebarContent />
      </aside>

      {/* Sidebar Móvil */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 h-full w-72 z-50 md:hidden shadow-2xl"
            >
              <SidebarContent onLinkClick={() => setSidebarOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="flex-1 md:ml-72 flex flex-col">
        {/* Header */}
        <header className="sticky top-0 h-16 bg-slate-900/80 backdrop-blur-xl border-b border-purple-500/20 z-30 flex items-center justify-between px-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white hover:bg-purple-600/30"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </Button>
          
          <div className="flex items-center gap-4 ml-auto">
            <motion.div 
              className="flex items-center gap-2 px-3 py-1.5 bg-purple-800/30 rounded-full"
              whileHover={{ scale: 1.05 }}
            >
              <Activity className="w-4 h-4 text-purple-400" />
              <span className="text-white font-medium text-sm">
                XP: {stats?.xp || 0}
              </span>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/profile')} 
              className="cursor-pointer"
            >
              <Avatar className="border-2 border-purple-500/50">
                <AvatarImage src={profile?.avatar_url} alt="Avatar" />
                <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white font-bold">
                  {userInitial}
                </AvatarFallback>
              </Avatar>
            </motion.div>
          </div>
        </header>

        {/* Contenido Principal */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;