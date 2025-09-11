import React from 'react';
import { useDrag } from 'react-dnd';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { accessoriesInventory, ItemTypes } from '@/config/accessories.js';
import { Lock, ImageOff } from 'lucide-react';

const AccessoryItem = ({ item, level }) => {
  const isUnlocked = level >= item.unlock_level;
  
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.ACCESSORY,
    item: { ...item, isUnlocked },
    canDrag: isUnlocked,
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
  }), [item, isUnlocked, level]);

  const itemContent = item.src && item.src !== '/assets/placeholder.png' ? (
    <img src={item.src} alt={item.name} className="max-w-full max-h-full object-contain" />
  ) : (
    <ImageOff className="w-8 h-8 text-muted-foreground" />
  );

  return (
    <div
      ref={drag}
      className={`relative aspect-square flex items-center justify-center p-2 rounded-xl border-2 transition-all duration-200
        ${isUnlocked ? 'bg-muted border-transparent cursor-grab hover:border-primary/50' : 'bg-muted/50 border-dashed border-border cursor-not-allowed opacity-60'}
        ${isDragging ? 'opacity-30 ring-2 ring-primary' : ''}`}
      title={item.name}
    >
      {itemContent}
      {!isUnlocked && (
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center p-1 rounded-lg">
          <Lock className="w-6 h-6 text-yellow-400" />
          <span className="text-xs font-bold text-white mt-1">Nivel {item.unlock_level}</span>
        </div>
      )}
    </div>
  );
};

const InventoryPanel = ({ level }) => {
    const categories = [
        { key: 'hat', name: 'Sombreros' },
        { key: 'glasses', name: 'Gafas' },
        { key: 'necklace', name: 'Collares' },
        { key: 'wristbands', name: 'Muñequeras' },
        { key: 'stickers', name: 'Stickers' },
    ];

    const tabCols = categories.length <= 3 ? `grid-cols-${categories.length}` : 'grid-cols-3';

    return (
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Inventario</h2>
        <p className="text-sm text-muted-foreground">Arrastra un ítem para equiparlo.</p>
        <Tabs defaultValue="hat" className="w-full">
          <TabsList className={`grid w-full ${tabCols}`}>
            {categories.map(cat => <TabsTrigger key={cat.key} value={cat.key}>{cat.name}</TabsTrigger>)}
          </TabsList>
          {categories.map(({key}) => (
            <TabsContent key={key} value={key}>
              <div className="grid grid-cols-3 gap-2 auto-rows-fr">
                {accessoriesInventory[key] && accessoriesInventory[key].map(item => <AccessoryItem key={item.id} item={item} level={level} />)}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    );
}

export default InventoryPanel;