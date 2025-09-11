
import React from 'react';
import { motion } from 'framer-motion';
import { content } from '@/config/content.js';
import { levelData } from '@/config/levels.js';
import { useData } from '@/contexts/DataContext';

const EnergikoPanda = ({ 
  pandaType = 'profile', 
  imageSrc: providedImageSrc,
  level: providedLevel,
  size = 'large', 
  className = '', 
  equippedItems = [],
  isStatic = false,
  animateOnClick = false
}) => {
  const { stats } = useData();
  const sizeClasses = {
    small: 'w-16 h-16',
    medium: 'w-24 h-24',
    large: 'w-32 h-32',
    xl: 'w-48 h-48',
    '2xl': 'w-64 h-64',
    full: 'w-full h-full'
  };

  const getPandaImageForLevel = (level) => {
    const levelInfo = levelData.find(l => l.level === level);
    return levelInfo ? levelInfo.pandaImage : content.pandas.level_01;
  };

  const resolveImageSrc = () => {
    if (providedImageSrc) return providedImageSrc;
    
    const currentLevel = providedLevel || stats?.level || 1;

    const pandaImages = {
      logo: content.panda_logo,
      landing: content.panda_landing,
      profile: content.panda_profile,
      dashboard: getPandaImageForLevel(currentLevel),
      map: getPandaImageForLevel(currentLevel),
      level: getPandaImageForLevel(currentLevel),
    };

    if (pandaType === 'level' && providedLevel) {
        return getPandaImageForLevel(providedLevel);
    }
    
    return pandaImages[pandaType] || pandaImages.profile;
  };

  const imageSrc = resolveImageSrc();
  const sortedItems = equippedItems ? [...equippedItems].sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0)) : [];

  const pandaMotionProps = isStatic ? {} : {
    initial: { y: 0 },
    animate: { y: [-2, 2, -2] },
    transition: {
      duration: 3,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "loop",
    }
  };
  
  const clickAnimationProps = animateOnClick ? {
    whileTap: { scale: 0.9, rotate: [0, -10, 10, 0] },
    transition: { type: 'spring', stiffness: 400, damping: 17 }
  } : {};

  return (
    <motion.div
      className={`${sizeClasses[size]} ${className} relative`}
      whileHover={!isStatic ? { scale: 1.05 } : {}}
      transition={{ type: 'spring', stiffness: 300, duration: 0.2 }}
      {...clickAnimationProps}
    >
      <motion.div 
        className="w-full h-full relative"
        {...pandaMotionProps}
      >
        <img 
            className="w-full h-full object-contain drop-shadow-lg pointer-events-none" 
            alt={`Panda rojo tierno llamado Enérgiko - version ${pandaType}`}
            src={imageSrc} 
        />
        <div className="absolute inset-0">
          {sortedItems.map((item) => (
            item.visible && item.src && (
              <motion.img
                key={item.instanceId || item.id}
                src={item.src}
                alt={item.name}
                className="absolute pointer-events-none"
                style={{
                  top: `${item.y}%`,
                  left: `${item.x}%`,
                  width: `${item.scale * 100}%`,
                  height: 'auto',
                  transform: `rotate(${item.rotation}deg) translate(-50%, -50%)`,
                  transformOrigin: 'top left',
                }}
              />
            )
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EnergikoPanda;
