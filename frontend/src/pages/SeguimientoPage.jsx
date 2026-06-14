import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { LineChart, Dumbbell, FolderKanban, BookMarked } from 'lucide-react';
import FitnessTab from '@/components/seguimiento/FitnessTab';
import ProyectosTab from '@/components/seguimiento/ProyectosTab';
import LecturaTab from '@/components/seguimiento/LecturaTab';

const TABS = [
  { id: 'fitness', label: 'Fitness', icon: <Dumbbell className="w-4 h-4" /> },
  { id: 'proyectos', label: 'Proyectos', icon: <FolderKanban className="w-4 h-4" /> },
  { id: 'lectura', label: 'Lectura', icon: <BookMarked className="w-4 h-4" /> }
];

const SeguimientoPage = () => {
  const [tab, setTab] = useState('fitness');

  return (
    <>
      <Helmet><title>Seguimiento - ConnectONE</title></Helmet>

      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-gradient-to-r from-purple-800/50 to-indigo-800/50 backdrop-blur rounded-2xl p-6 border border-purple-500/30">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3"><LineChart className="w-7 h-7 text-green-300" /> Seguimiento</h1>
          <p className="text-purple-200 mt-2">Mide tu progreso real: cuerpo, proyectos y lecturas. Lo que se mide, mejora.</p>
        </div>

        {/* Pestañas */}
        <div className="flex gap-2 bg-white/5 rounded-xl p-1 sticky top-2 z-10 backdrop-blur">
          {TABS.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${tab === t.id ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' : 'text-purple-300 hover:text-white'}`}>
              {t.icon} <span className="hidden sm:inline">{t.label}</span>
            </button>
          ))}
        </div>

        {tab === 'fitness' && <FitnessTab />}
        {tab === 'proyectos' && <ProyectosTab />}
        {tab === 'lectura' && <LecturaTab />}
      </div>
    </>
  );
};

export default SeguimientoPage;
