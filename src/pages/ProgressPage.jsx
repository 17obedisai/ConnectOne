import React, { useRef, useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { GitBranch, Gift, X } from 'lucide-react';
import EnergikoPanda from '@/components/EnergikoPanda';
import { useData } from '@/contexts/DataContext';
import { levelData, getLevelRewards } from '@/config/levels.js';
import { content } from '@/config/content.js';

const biomes = {
    forest: { levels: [1, 2, 3], bg: content.map.biome_forest_bg },
    river: { levels: [4, 5, 6], bg: content.map.biome_river_bg },
    mountain: { levels: [7, 8, 9], bg: content.map.biome_mountain_bg },
    city: { levels: [10, 11, 12], bg: content.map.biome_city_bg },
    temple: { levels: [13, 14, 15, 16], bg: content.map.biome_temple_bg },
};

const getBiomeForLevel = (level) => {
    for (const biomeKey in biomes) {
        if (biomes[biomeKey].levels.includes(level)) {
            return biomeKey;
        }
    }
    return 'forest';
};

const MapNode = ({ node, userLevel, onClick }) => {
    const isUnlocked = userLevel >= node.level;
    const isCurrent = userLevel === node.level;

    const getNodeIcon = () => {
        if (isCurrent) return content.icons.node_current;
        if (isUnlocked) return content.icons.node_unlocked;
        return content.icons.node_locked;
    };

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <motion.div
                        className="absolute cursor-pointer"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: (node.level - 1) * 0.1 }}
                        style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)' }}
                        onClick={() => onClick(node)}
                    >
                        <motion.img
                            src={getNodeIcon()}
                            alt={`Nivel ${node.level}`}
                            className={`w-10 h-10 md:w-12 md:h-12 drop-shadow-lg ${isCurrent ? 'node-glow' : ''}`}
                            whileHover={{ scale: 1.2 }}
                        />
                    </motion.div>
                </TooltipTrigger>
                <TooltipContent>
                    <p className="font-bold text-center">{node.name}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

const LevelDetailModal = ({ level, onClose }) => {
    const rewards = getLevelRewards(level.level);
    return (
        <motion.div 
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div 
                className="bg-card rounded-2xl p-6 w-full max-w-sm text-center relative"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
            >
                <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={onClose}><X className="w-4 h-4" /></Button>
                <EnergikoPanda pandaType="level" level={level.level} size="large" isStatic={true} className="mx-auto" />
                <h2 className="text-2xl font-bold mt-4">{level.name}</h2>
                <p className="text-sm text-muted-foreground">Nivel {level.level}</p>
                <p className="text-sm text-primary font-semibold">{level.xpThreshold} PXP requeridos</p>

                {rewards.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-border">
                        <h3 className="font-bold mb-2">Recompensas</h3>
                        <ul className="text-sm space-y-1">
                        {rewards.map(r => <li key={r.id} className="flex items-center justify-center gap-2">
                            <img src={r.src} alt={r.name} className="w-6 h-6 object-contain" /> {r.name}
                            </li>)}
                        </ul>
                    </div>
                )}
                 <Button onClick={onClose} className="mt-6 w-full">Cerrar</Button>
            </motion.div>
        </motion.div>
    );
};

const ProgressPage = () => {
    const navigate = useNavigate();
    const { stats, loading, customization } = useData();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [selectedLevel, setSelectedLevel] = useState(null);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const userLevel = stats?.level || 1;
    const currentBiomeKey = getBiomeForLevel(userLevel);

    const pathPoints = useMemo(() => [
        { x: 10, y: 80 }, { x: 20, y: 65 }, { x: 30, y: 85 },
        { x: 40, y: 70 }, { x: 50, y: 80 }, { x: 60, y: 60 },
        { x: 70, y: 75 }, { x: 80, y: 55 }, { x: 90, y: 65 },
        { x: 85, y: 40 }, { x: 75, y: 25 }, { x: 65, y: 35 },
        { x: 55, y: 20 }, { x: 45, y: 30 }, { x: 30, y: 15 },
        { x: 15, y: 25 }
    ], []);

    const pathD = useMemo(() => {
      let d = "";
      if (pathPoints.length > 0) {
        const startPoint = pathPoints[0];
        d = `M ${startPoint.x * 9.8} ${startPoint.y * 9.8}`; // Scale factor for a 1000x1000 viewbox
    
        for (let i = 0; i < pathPoints.length - 1; i++) {
          const p1 = pathPoints[i];
          const p2 = pathPoints[i + 1];
          const midX = (p1.x + p2.x) * 4.9;
          const midY = (p1.y + p2.y) * 4.9;
          d += ` Q ${p1.x * 9.8} ${midY}, ${midX} ${midY}`;
          d += ` T ${p2.x * 9.8} ${p2.y * 9.8}`;
        }
      }
      return d;
    }, [pathPoints]);


    const handleNodeClick = (node) => {
        setSelectedLevel(node);
    };

    const nextRewardLevel = levelData.find(l => getLevelRewards(l.level).length > 0 && l.level > userLevel);
    
    if (loading || !stats) {
        return <div className="flex items-center justify-center min-h-screen bg-background">Cargando tu progreso...</div>;
    }

    const MobileView = () => {
        const carouselRef = useRef(null);
        useEffect(() => {
          if (carouselRef.current) {
            const nodeElement = carouselRef.current.children[userLevel - 1];
            if (nodeElement) {
                const scrollPosition = nodeElement.offsetLeft - (carouselRef.current.offsetWidth / 2) + (nodeElement.offsetWidth / 2);
                carouselRef.current.scrollTo({ left: scrollPosition, behavior: 'smooth' });
            }
          }
        }, [userLevel]);
    
        return (
            <div className="w-full">
                <Card className="p-4 rounded-3xl border-border shadow-lg" style={{borderWidth: '4px'}}>
                   <div ref={carouselRef} className="flex overflow-x-auto space-x-8 p-4 snap-x snap-mandatory">
                      {levelData.map(node => (
                          <div key={node.level} className="snap-center flex-shrink-0 w-32 h-40 flex flex-col items-center justify-center relative cursor-pointer" onClick={() => handleNodeClick(node)}>
                              {userLevel === node.level && (
                                  <motion.div
                                    layoutId="panda-avatar-mobile"
                                    className="absolute -top-12 z-10"
                                  >
                                      <EnergikoPanda pandaType="map" size="medium" isStatic={true}/>
                                  </motion.div>
                              )}
                              <img src={userLevel >= node.level ? content.icons.node_unlocked : content.icons.node_locked} alt={`Icono nivel ${node.level}`} className="w-16 h-16"/>
                              <p className="font-bold text-sm mt-2 text-center">{node.name}</p>
                          </div>
                      ))}
                   </div>
                </Card>
            </div>
        );
    };

    const DesktopView = () => (
        <Card className="w-full aspect-video rounded-3xl p-1 shadow-2xl shadow-primary/10 overflow-hidden relative" style={{borderWidth: '20px'}}>
            <div className="absolute inset-0 w-full h-full">
                {Object.keys(biomes).map(key => (
                    <motion.div
                        key={key}
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${biomes[key].bg})` }}
                        animate={{ opacity: currentBiomeKey === key ? 1 : 0 }}
                        transition={{ duration: 1 }}
                    />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/20" />
            </div>

            <svg viewBox="0 0 1000 1000" className="absolute w-full h-full opacity-50" preserveAspectRatio="none">
                <path d={pathD} fill="none" stroke="white" strokeWidth="4" strokeDasharray="10 10" />
            </svg>

            <div className="relative w-full h-full">
                {levelData.map((node, i) => (
                    pathPoints[i] && <MapNode key={node.level} node={{ ...node, ...pathPoints[i] }} userLevel={userLevel} onClick={handleNodeClick} />
                ))}

                {pathPoints.length > 0 && userLevel <= pathPoints.length && (
                    <motion.div
                        layoutId="panda-avatar"
                        className="absolute w-24 h-24"
                        initial={false}
                        animate={{
                            left: `${pathPoints[userLevel - 1].x}%`,
                            top: `${pathPoints[userLevel - 1].y}%`,
                        }}
                        transition={{ duration: 0.8, ease: [0.32, 0, 0.67, 0] }}
                        style={{ transform: 'translate(-50%, -50%)' }}
                    >
                        <EnergikoPanda
                            pandaType="map"
                            size="medium"
                            isStatic={true}
                            equippedItems={customization?.items}
                            className="drop-shadow-2xl"
                        />
                    </motion.div>
                )}
            </div>
        </Card>
    );

    return (
        <>
            <Helmet>
                <title>Mapa de Progreso - ConnectONE</title>
                <meta name="description" content="Visualiza tu viaje de crecimiento en el mapa de progreso de ConnectONE." />
            </Helmet>

            <AnimatePresence>
                {selectedLevel && <LevelDetailModal level={selectedLevel} onClose={() => setSelectedLevel(null)} />}
            </AnimatePresence>
            
            <div className="min-h-screen w-full p-2 md:p-4">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <div className="flex items-center gap-4 mb-6">
                        <GitBranch className="w-10 h-10 text-primary" />
                        <div>
                            <h1 className="text-4xl font-bold text-foreground">Mapa de Progreso</h1>
                            <p className="text-muted-foreground">Tu viaje de crecimiento, un paso a la vez.</p>
                        </div>
                    </div>
                </motion.div>

                {isMobile ? <MobileView /> : <DesktopView />}
                
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                    {nextRewardLevel && (
                        <Card className="mt-6 bg-card/80 backdrop-blur-sm border-primary/20">
                            <CardContent className="p-4 flex items-center justify-center gap-4">
                                <Gift className="w-8 h-8 text-accent" />
                                <div className="text-center">
                                    <h3 className="font-bold text-foreground">Próxima Recompensa en Nivel {nextRewardLevel.level}</h3>
                                    <p className="text-sm text-muted-foreground">
                                        {getLevelRewards(nextRewardLevel.level).map(r => r.name).join(', ')}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                    <div className="text-center mt-6">
                         <Button onClick={() => navigate('/dashboard')} className="primary-glow">Volver al Dashboard</Button>
                    </div>
                </motion.div>
            </div>
        </>
    );
};

export default ProgressPage;