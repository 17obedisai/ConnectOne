import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Star, Flame, Trophy, Edit3, Camera, Crown, 
  Sparkles, CheckCircle, Lock
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { useToast } from '@/components/ui/use-toast';
import EnergikoPanda from '@/components/EnergikoPanda';
import { unlockableItems } from '@/data/unlockableItems';

const ProfilePage = () => {
  const { user } = useAuth();
  const { stats, updateCustomization } = useData();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [equippedItems, setEquippedItems] = useState({});
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bio, setBio] = useState('Viva España 🏁');

  const level = stats?.level || 1;
  const xp = stats?.xp || 80;
  const xpToNext = stats?.xp_to_next_level || 1000;
  const xpPercentage = (xp / xpToNext) * 100;

  const getUnlockedItems = () => {
    const items = [];
    for (let lvl = 1; lvl <= level; lvl++) {
      if (unlockableItems[lvl]) {
        items.push(...unlockableItems[lvl].items.map(item => ({
          ...item,
          unlockedAt: lvl
        })));
      }
    }
    return items;
  };

  const unlockedItems = getUnlockedItems();

  const itemCategories = [
    { id: 'all', name: 'Hacer', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'accessories', name: 'Accesorios', icon: <Crown className="w-4 h-4" /> },
    { id: 'backgrounds', name: 'Fondos', icon: '🏞️' },
    { id: 'effects', name: 'Efectos', icon: '⚡' },
    { id: 'titles', name: 'Títulos', icon: '🏅' }
  ];

  const handleEquipItem = (item) => {
    const newEquipped = { ...equippedItems };
    if (newEquipped[item.id]) {
      delete newEquipped[item.id];
    } else {
      newEquipped[item.id] = item;
    }
    setEquippedItems(newEquipped);
    updateCustomization({ items: Object.values(newEquipped) });
    
    toast({
      title: newEquipped[item.id] ? "Equipado" : "Desequipado",
      description: `${item.name} ${newEquipped[item.id] ? 'equipado' : 'desequipado'}`
    });
  };

  return (
    <>
      <Helmet>
        <title>Mi Perfil - ConnectONE</title>
      </Helmet>

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header del perfil */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900/50 to-blue-900/50 p-8"
        >
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Avatar 3D-like con Panda Rojo */}
              <motion.div 
                className="relative group"
                whileHover={{ rotateY: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="relative w-40 h-40 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 p-1">
                  <div className="w-full h-full bg-gray-900 rounded-xl flex items-center justify-center">
                    <EnergikoPanda 
                      pandaType="profile" 
                      size="xlarge"
                      equippedItems={Object.values(equippedItems)}
                    />
                  </div>
                </div>
                <Button 
                  size="icon" 
                  className="absolute -bottom-2 -right-2 rounded-full"
                  variant="secondary"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </motion.div>

              {/* Información principal */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold mb-2">obedecio</h1>
                <p className="text-gray-400 mb-2">{user?.email || 'obedisai1717@gmail.com'}</p>
                
                {/* Bio editable */}
                <div className="mb-4 flex items-center gap-2">
                  {isEditingBio ? (
                    <>
                      <input
                        type="text"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="px-3 py-1 rounded bg-gray-800 border border-gray-700"
                      />
                      <Button size="sm" onClick={() => setIsEditingBio(false)}>
                        Guardar
                      </Button>
                    </>
                  ) : (
                    <>
                      <p className="italic">{bio}</p>
                      <Button size="icon" variant="ghost" onClick={() => setIsEditingBio(true)}>
                        <Edit3 className="w-3 h-3" />
                      </Button>
                    </>
                  )}
                </div>

                {/* Stats principales */}
                <div className="flex gap-6">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <span className="text-xl font-bold">{level}</span>
                    <span className="text-sm text-gray-400">Nivel</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Flame className="w-5 h-5 text-orange-500" />
                    <span className="text-xl font-bold">{stats?.streak || 1}</span>
                    <span className="text-sm text-gray-400">Racha</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-purple-500" />
                    <span className="text-xl font-bold">{stats?.achievements_unlocked || 0}</span>
                    <span className="text-sm text-gray-400">Logros</span>
                  </div>
                </div>
              </div>

              {/* Progreso */}
              <Card className="w-full md:w-64 bg-gray-800/50 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Nivel {level}</span>
                    <span>Nivel {level + 1}</span>
                  </div>
                  <Progress value={xpPercentage} className="h-2 mb-2" />
                  <p className="text-center text-sm">
                    {xp} / {xpToNext} XP
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="overview">General</TabsTrigger>
            <TabsTrigger value="inventory">Inventario</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-6 text-center">
                <p className="text-gray-400">
                  Sigue completando misiones para subir de nivel y desbloquear más contenido
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inventory" className="space-y-4">
            {/* Filtros */}
            <div className="flex gap-2 overflow-x-auto">
              {itemCategories.map(cat => (
                <Button
                  key={cat.id}
                  variant={selectedCategory === cat.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  {typeof cat.icon === 'string' ? cat.icon : cat.icon}
                  <span className="ml-2">{cat.name}</span>
                </Button>
              ))}
            </div>

            {/* Items */}
            {unlockedItems.length > 0 ? (
              <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                {unlockedItems.map(item => (
                  <Card 
                    key={item.id}
                    className={`cursor-pointer bg-gray-800/50 border-gray-700 ${
                      equippedItems[item.id] ? 'ring-2 ring-purple-500' : ''
                    }`}
                    onClick={() => handleEquipItem(item)}
                  >
                    <CardContent className="p-4">
                      <div className="aspect-square rounded bg-gradient-to-br from-purple-900/50 to-blue-900/50 flex items-center justify-center mb-2">
                        <span className="text-2xl">🎁</span>
                      </div>
                      <p className="text-xs text-center">{item.name}</p>
                      <p className="text-xs text-center text-gray-500">Nivel {item.unlockedAt}</p>
                      {equippedItems[item.id] && (
                        <CheckCircle className="w-4 h-4 mx-auto mt-1 text-green-500" />
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-8 text-center">
                  <Lock className="w-12 h-12 mx-auto mb-4 text-gray-500" />
                  <p className="text-gray-400">
                    Sube de nivel para desbloquear items
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default ProfilePage;