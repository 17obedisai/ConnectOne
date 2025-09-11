
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { toPng } from 'html-to-image';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { getAnchors, accessoriesInventory } from '@/config/accessories.js';

import InventoryPanel from '@/components/profile/InventoryPanel';
import PandaCanvas from '@/components/profile/PandaCanvas';
import ActionsPanel from '@/components/profile/ActionsPanel';
import ProfileInfo from '@/components/profile/ProfileInfo';

const ProfilePage = () => {
  const { user } = useAuth();
  const { profile, stats, loading, refreshData } = useData();
  const { toast } = useToast();

  const [equippedItems, setEquippedItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const pandaContainerRef = useRef(null);

  useEffect(() => {
    if (user) {
      const savedCustomization = JSON.parse(localStorage.getItem(`customization_${user.id}`));
      if (savedCustomization && savedCustomization.items) {
        setEquippedItems(savedCustomization.items);
      }
    }
  }, [user]);

  const updateEquippedItem = (instanceId, updates) => {
    setEquippedItems(prev => prev.map(item => item.instanceId === instanceId ? { ...item, ...updates } : item));
    if (selectedItem?.instanceId === instanceId) {
        setSelectedItem(prev => ({...prev, ...updates}));
    }
  };

  const handleDrop = useCallback((item, monitor) => {
    if (!item.isUnlocked) {
        toast({ title: "Bloqueado", description: `Necesitas alcanzar el nivel ${item.unlock_level} para usar esto.`, variant: "destructive" });
        return;
    }
    
    const anchor = getAnchors(item.category, item.hand);
    const newItem = {
        ...item,
        x: anchor.x,
        y: anchor.y,
        scale: anchor.scale,
        rotation: 0,
        zIndex: anchor.zIndex,
        visible: true,
        instanceId: `${item.id}_${Date.now()}`,
    };

    const canHaveMultiple = ['wristbands', 'stickers'].includes(item.category);
    
    setEquippedItems(prev => {
        const isEquipped = prev.some(i => i.id === item.id);
        if (isEquipped && !canHaveMultiple) {
            toast({ title: "Ya equipado", description: "Solo puedes tener un ítem de esta categoría.", variant: "default" });
            return prev;
        }
        const filteredPrev = canHaveMultiple ? prev : prev.filter(i => i.category !== item.category);
        return [...filteredPrev, newItem];
    });
  }, [toast, stats]);
  
  const handleSaveCustomization = async () => {
    if (user) {
      try {
        const customizationToSave = { items: equippedItems };
        localStorage.setItem(`customization_${user.id}`, JSON.stringify(customizationToSave));
        toast({ title: "¡Personalización guardada!", description: "El nuevo look de Enérgiko está listo." });
        await refreshData();
      } catch (e) {
        toast({ title: "Error", description: "No se pudo guardar la personalización.", variant: "destructive" });
      }
    }
  };

  const removeItem = (instanceId) => {
    setEquippedItems(prev => prev.filter(item => item.instanceId !== instanceId));
    if (selectedItem?.instanceId === instanceId) setSelectedItem(null);
  };

  const removeAll = () => {
    setEquippedItems([]);
    setSelectedItem(null);
  };
  
  const randomize = () => {
    if (!stats) return;
    const randomItems = [];
    const categories = Object.keys(accessoriesInventory);
    
    categories.forEach(category => {
      if (Math.random() > 0.4) {
        const unlockedItems = accessoriesInventory[category].filter(i => (stats.level >= i.unlock_level) && i.src && i.src !== '/assets/placeholder.png');
        if (unlockedItems.length > 0) {
          const randomItem = unlockedItems[Math.floor(Math.random() * unlockedItems.length)];
          const anchor = getAnchors(randomItem.category, randomItem.hand);
          randomItems.push({
            ...randomItem,
            x: anchor.x + (Math.random() * 10 - 5),
            y: anchor.y + (Math.random() * 10 - 5),
            scale: anchor.scale * (Math.random() * 0.4 + 0.8),
            rotation: Math.floor(Math.random() * 40) - 20,
            zIndex: anchor.zIndex,
            visible: true,
            instanceId: `${randomItem.id}_${Date.now()}`,
          });
        }
      }
    });
    setEquippedItems(randomItems);
  };

  const exportAsPng = useCallback(() => {
    if (pandaContainerRef.current === null) {
      toast({ title: "Error", description: "No se puede exportar la imagen ahora mismo.", variant: "destructive" });
      return;
    }
    toPng(pandaContainerRef.current, { cacheBust: true, backgroundColor: 'transparent', pixelRatio: 2 })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'energiko-personalizado.png';
        link.href = dataUrl;
        link.click();
        toast({ title: "¡Exportado!", description: "Tu Enérgiko personalizado se está descargando." });
      })
      .catch((err) => {
        console.error(err);
        toast({ title: "Error de exportación", description: "No se pudo generar la imagen.", variant: "destructive" });
      });
  }, [pandaContainerRef, toast]);

  if (loading || !profile || !stats || !user) {
    return <div className="flex items-center justify-center min-h-screen">Cargando perfil...</div>;
  }

  return (
    <>
      <Helmet>
        <title>Mi Perfil y Personalización - ConnectONE</title>
        <meta name="description" content="Personaliza a Enérgiko y gestiona la información de tu perfil en ConnectONE." />
      </Helmet>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-8">
        <h1 className="text-4xl font-bold gradient-text">Mi Perfil</h1>

        {/* Mobile View */}
        <div className="block md:hidden">
          <Tabs defaultValue="panda" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="accesorios">Accesorios</TabsTrigger>
              <TabsTrigger value="panda">Panda</TabsTrigger>
              <TabsTrigger value="acciones">Acciones</TabsTrigger>
            </TabsList>
            <TabsContent value="accesorios" className="p-4 bg-card rounded-b-2xl"><InventoryPanel level={stats.level} /></TabsContent>
            <TabsContent value="panda" className="p-4 bg-card rounded-b-2xl">
                <PandaCanvas 
                    equippedItems={equippedItems} 
                    onDrop={handleDrop} 
                    onUpdateItem={updateEquippedItem} 
                    selectedItem={selectedItem}
                    setSelectedItem={setSelectedItem}
                    pandaContainerRef={pandaContainerRef}
                />
            </TabsContent>
            <TabsContent value="acciones" className="p-4 bg-card rounded-b-2xl">
                <ActionsPanel 
                    onSave={handleSaveCustomization}
                    onRemoveAll={removeAll}
                    onRandomize={randomize}
                    onExport={exportAsPng}
                    selectedItem={selectedItem}
                    onUpdateItem={updateEquippedItem}
                    onRemoveItem={removeItem}
                />
            </TabsContent>
          </Tabs>
        </div>

        {/* Desktop View */}
        <div className="hidden md:grid md:grid-cols-12 gap-6">
          <div className="md:col-span-3"><Card className="p-4 h-full"><InventoryPanel level={stats.level} /></Card></div>
          <div className="md:col-span-6">
            <PandaCanvas 
                equippedItems={equippedItems} 
                onDrop={handleDrop} 
                onUpdateItem={updateEquippedItem} 
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                pandaContainerRef={pandaContainerRef}
            />
          </div>
          <div className="md:col-span-3"><Card className="p-4 h-full">
            <ActionsPanel 
                onSave={handleSaveCustomization}
                onRemoveAll={removeAll}
                onRandomize={randomize}
                onExport={exportAsPng}
                selectedItem={selectedItem}
                onUpdateItem={updateEquippedItem}
                onRemoveItem={removeItem}
            />
            </Card></div>
        </div>
        
        <ProfileInfo profile={profile} stats={stats} refreshData={refreshData} />
      </motion.div>
    </>
  );
};

export default ProfilePage;
