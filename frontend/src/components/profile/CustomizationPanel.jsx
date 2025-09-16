    import React, { useState, useEffect } from 'react';
    import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
    import { Button } from '@/components/ui/button';
    import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
    import { Badge } from '@/components/ui/badge';
    import { Lock, Check, Sparkles, Crown } from 'lucide-react';
    import { useData } from '@/contexts/DataContext';
    import { unlockableItems } from '@/data/unlockableItems';
    import EnergikoPanda from '@/components/EnergikoPanda';

    const CustomizationPanel = () => {
    const { stats, customization, updateCustomization } = useData();
    const [selectedItems, setSelectedItems] = useState({});
    const [unlockedItems, setUnlockedItems] = useState([]);
    
    const currentLevel = stats?.level || 1;

    useEffect(() => {
        // Obtener todos los artículos desbloqueados hasta el nivel actual
        const unlocked = [];
        for (let level = 1; level <= currentLevel; level++) {
        if (unlockableItems[level]) {
            unlocked.push(...unlockableItems[level].items);
        }
        }
        setUnlockedItems(unlocked);
    }, [currentLevel]);

    const handleEquipItem = (item) => {
        const newSelection = { ...selectedItems };
        
        // Si el artículo ya está equipado, lo desequipamos
        if (selectedItems[item.id]) {
        delete newSelection[item.id];
        } else {
        newSelection[item.id] = item;
        }
        
        setSelectedItems(newSelection);
        updateCustomization({ items: Object.values(newSelection) });
    };

    const categories = [
        { id: 'all', name: 'Todo', icon: <Sparkles className="w-4 h-4" /> },
        { id: 'accessories', name: 'Accesorios', icon: <Crown className="w-4 h-4" /> },
        { id: 'backgrounds', name: 'Fondos', icon: '🌄' },
        { id: 'titles', name: 'Títulos', icon: '🏅' }
    ];

    return (
        <Card>
        <CardHeader>
            <CardTitle>Personalización del Avatar</CardTitle>
        </CardHeader>
        <CardContent>
            {/* Vista previa del avatar */}
            <div className="flex justify-center mb-6 p-8 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg">
            <div className="relative">
                <EnergikoPanda 
                pandaType="profile" 
                size="large"
                equippedItems={Object.values(selectedItems)}
                />
                {/* Mostrar artículos equipados como overlays */}
                {Object.values(selectedItems).map(item => (
                item.image && (
                    <img 
                    key={item.id}
                    src={item.image} 
                    alt={item.name}
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    style={{ zIndex: 10 }}
                    />
                )
                ))}
            </div>
            </div>

            <Tabs defaultValue="all" className="space-y-4">
            <TabsList className="grid grid-cols-4 w-full">
                {categories.map(cat => (
                <TabsTrigger key={cat.id} value={cat.id}>
                    {cat.icon}
                    <span className="ml-2">{cat.name}</span>
                </TabsTrigger>
                ))}
            </TabsList>

            <TabsContent value="all" className="space-y-4">
                <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                {unlockedItems.map(item => (
                    <Card 
                    key={item.id}
                    className={`cursor-pointer transition-all ${
                        selectedItems[item.id] 
                        ? 'ring-2 ring-primary' 
                        : 'hover:shadow-lg'
                    }`}
                    onClick={() => handleEquipItem(item)}
                    >
                    <CardContent className="p-4">
                        <div className="relative">
                        {item.image ? (
                            <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-16 h-16 mx-auto mb-2"
                            />
                        ) : (
                            <div className="w-16 h-16 mx-auto mb-2 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                            <span className="text-2xl">{item.id.includes('title') ? '🏅' : '✨'}</span>
                            </div>
                        )}
                        {selectedItems[item.id] && (
                            <div className="absolute top-0 right-0 bg-green-500 rounded-full p-1">
                            <Check className="w-3 h-3 text-white" />
                            </div>
                        )}
                        </div>
                        <p className="text-xs text-center font-medium">{item.name}</p>
                    </CardContent>
                    </Card>
                ))}
                </div>

                {/* Mostrar próximos desbloqueos */}
                <div className="mt-6">
                <h3 className="font-semibold mb-3">Próximos Desbloqueos</h3>
                <div className="space-y-2">
                    {Object.entries(unlockableItems)
                    .filter(([level]) => parseInt(level) > currentLevel)
                    .slice(0, 3)
                    .map(([level, data]) => (
                        <div key={level} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center gap-3">
                            <Lock className="w-4 h-4 text-muted-foreground" />
                            <div>
                            <p className="font-medium">Nivel {level}</p>
                            <p className="text-xs text-muted-foreground">
                                {data.items.length} artículo{data.items.length > 1 ? 's' : ''}
                            </p>
                            </div>
                        </div>
                        <Badge variant="outline">
                            {parseInt(level) - currentLevel} niveles
                        </Badge>
                        </div>
                    ))}
                </div>
                </div>
            </TabsContent>
            </Tabs>
        </CardContent>
        </Card>
    );
    };

export default CustomizationPanel;