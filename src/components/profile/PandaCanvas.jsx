import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useDrop } from 'react-dnd';
import EnergikoPanda from '@/components/EnergikoPanda';
import { ItemTypes } from '@/config/accessories';

const DraggableAccessory = ({ item, onSelect, onDragEnd, isSelected }) => (
    <motion.div
        key={item.instanceId}
        className={`absolute cursor-pointer rounded-md border-2 ${isSelected ? 'border-primary' : 'border-transparent'}`}
        style={{
            top: `${item.y}%`,
            left: `${item.x}%`,
            width: `${item.scale * 100}%`,
            height: 'auto',
            transform: `rotate(${item.rotation}deg) translate(-50%, -50%)`,
            transformOrigin: 'top left',
        }}
        onClick={() => onSelect(item)}
        drag
        dragMomentum={false}
        onDragEnd={(event, info) => onDragEnd(event, info, item.instanceId)}
    >
        <img src={item.src} alt={item.name} className="w-full h-full pointer-events-none" />
    </motion.div>
);

const PandaCanvas = ({ 
    equippedItems, 
    onDrop, 
    onUpdateItem, 
    selectedItem, 
    setSelectedItem,
    pandaContainerRef
}) => {
    const canvasRef = useRef(null);

    const [{ isOver }, drop] = useDrop(() => ({
        accept: ItemTypes.ACCESSORY,
        drop: (item, monitor) => onDrop(item, monitor),
        collect: monitor => ({ isOver: !!monitor.isOver() }),
    }), [onDrop]);

    const handleDragEnd = (event, info, instanceId) => {
        if (!canvasRef.current) return;
        const canvasRect = canvasRef.current.getBoundingClientRect();
        
        const droppedX = info.point.x - canvasRect.left;
        const droppedY = info.point.y - canvasRect.top;

        if (droppedX < 0 || droppedX > canvasRect.width || droppedY < 0 || droppedY > canvasRect.height) {
           // Item dropped outside, logic to remove could be here, or handled in parent
        } else {
            const newX = (droppedX / canvasRect.width) * 100;
            const newY = (droppedY / canvasRect.height) * 100;
            onUpdateItem(instanceId, { x: newX, y: newY });
        }
    };

    return (
        <div
            ref={drop}
            className={`w-full aspect-square max-w-[520px] mx-auto bg-card rounded-3xl relative transition-all duration-300 overflow-hidden ${isOver ? 'shadow-2xl shadow-primary/40' : 'shadow-lg'}`}
        >
            <div ref={canvasRef} className="w-full h-full">
                <div ref={pandaContainerRef} className="absolute inset-0">
                    <EnergikoPanda pandaType="profile" size="full" equippedItems={equippedItems} isStatic={true} />
                </div>
                {equippedItems.map((item) =>
                    item.visible && item.src && (
                        <DraggableAccessory
                            key={item.instanceId}
                            item={item}
                            onSelect={setSelectedItem}
                            onDragEnd={handleDragEnd}
                            isSelected={selectedItem?.instanceId === item.instanceId}
                        />
                    )
                )}
            </div>
        </div>
    );
};

export default PandaCanvas;