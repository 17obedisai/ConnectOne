import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Save, Trash2, Wand2, Download, Eye, EyeOff } from 'lucide-react';

const ActionsPanel = ({
    onSave,
    onRemoveAll,
    onRandomize,
    onExport,
    selectedItem,
    onUpdateItem,
    onRemoveItem
}) => {
    if (!onSave) return null; // Prevent render if props are not ready

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold mb-4">Acciones</h2>
                <div className="space-y-2">
                    <Button onClick={onSave} className="w-full bg-primary hover:bg-primary/90"><Save className="w-4 h-4 mr-2" /> Guardar</Button>
                    <Button onClick={onRemoveAll} variant="destructive" className="w-full"><Trash2 className="w-4 h-4 mr-2" /> Quitar todo</Button>
                    <Button onClick={onRandomize} variant="secondary" className="w-full"><Wand2 className="w-4 h-4 mr-2" /> Estilo aleatorio</Button>
                    <Button onClick={onExport} variant="outline" className="w-full"><Download className="w-4 h-4 mr-2" />Exportar PNG</Button>
                </div>
            </div>

            <AnimatePresence>
                {selectedItem && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="space-y-4 pt-4 border-t border-border"
                    >
                        <h3 className="text-lg font-semibold">{selectedItem.name}</h3>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label>Rotación: {Math.round(selectedItem.rotation)}°</Label>
                                <Slider value={[selectedItem.rotation]} onValueChange={([val]) => onUpdateItem(selectedItem.instanceId, { rotation: val })} min={-180} max={180} step={1} />
                            </div>
                            <div className="space-y-2">
                                <Label>Escala: {Math.round(selectedItem.scale * 100)}%</Label>
                                <Slider value={[selectedItem.scale]} onValueChange={([val]) => onUpdateItem(selectedItem.instanceId, { scale: val })} min={0.1} max={1.5} step={0.01} />
                            </div>
                            <div className="space-y-2">
                                <Label>Capa (z-index)</Label>
                                <Slider value={[selectedItem.zIndex]} onValueChange={([val]) => onUpdateItem(selectedItem.instanceId, { zIndex: val })} min={1} max={50} step={1} />
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <Button variant="ghost" size="icon" onClick={() => onUpdateItem(selectedItem.instanceId, { visible: !selectedItem.visible })}>
                                {selectedItem.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                            </Button>
                            <Button variant="destructive" size="icon" onClick={() => onRemoveItem(selectedItem.instanceId)}><Trash2 className="w-4 h-4" /></Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ActionsPanel;