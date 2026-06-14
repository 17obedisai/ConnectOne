import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import {
  User, Target, Settings as SettingsIcon, Save, Loader2, Star, Flame, Zap,
  Lock, CheckCircle, LogOut, Bell, MapPin, Palette
} from 'lucide-react';
import confetti from 'canvas-confetti';
import api from '@/services/api';

const INTERESES = [
  { value: 'software', label: 'Software', emoji: '💻' },
  { value: 'music', label: 'Música/Audio', emoji: '🎚️' },
  { value: 'languages', label: 'Idiomas', emoji: '🌍' },
  { value: 'study', label: 'Estudio', emoji: '📚' },
  { value: 'fitness', label: 'Fitness', emoji: '🏋️' },
  { value: 'finance', label: 'Finanzas', emoji: '💰' }
];
const OBJETIVOS = [
  { value: 'physical_wellness', label: 'Bienestar físico', emoji: '❤️' },
  { value: 'mental_wellness', label: 'Claridad mental', emoji: '🧠' },
  { value: 'productivity', label: 'Productividad', emoji: '⚡' }
];

const ProfilePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { logout } = useAuth();
  const { updateUser } = useData();
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState('perfil');
  const [form, setForm] = useState({ nombre: '', bio: '', ciudad: '' });
  const [objetivo, setObjetivo] = useState('');
  const [intereses, setIntereses] = useState([]);
  const [notificaciones, setNotificaciones] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get('/users/profile');
        setPerfil(data);
        setForm({ nombre: data.nombre || '', bio: data.bio || '', ciudad: data.ciudad || '' });
        setObjetivo((data.perfilInicial?.objetivos || [])[0] || '');
        setIntereses(data.perfilInicial?.intereses || []);
        setNotificaciones(data.preferencias?.notificaciones !== false);
      } catch (e) { console.error(e.message); } finally { setLoading(false); }
    })();
  }, []);

  const nivel = perfil?.nivel || 1;
  const avatarSkin = perfil?.avatarSkin || 1;

  const guardar = async () => {
    setSaving(true);
    try {
      const { data } = await api.put('/users/profile', {
        nombre: form.nombre, bio: form.bio, ciudad: form.ciudad,
        objetivos: objetivo ? [objetivo] : [], intereses, notificaciones
      });
      setPerfil(data.data);
      updateUser({ nombre: data.data.nombre });
      toast({ title: '✅ Perfil guardado' });
    } catch (e) {
      toast({ title: 'Error', description: e.response?.data?.message || 'No se pudo guardar.', variant: 'destructive' });
    } finally { setSaving(false); }
  };

  const elegirSkin = async (n) => {
    if (n > nivel) return;
    try {
      const { data } = await api.put('/users/profile', { avatarSkin: n });
      setPerfil(data.data);
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
      toast({ title: '🎨 Skin actualizada', description: `Nivel ${n}` });
    } catch (e) { /* noop */ }
  };

  const toggleInteres = (v) => setIntereses((p) => p.includes(v) ? p.filter((x) => x !== v) : [...p, v]);

  const cerrarSesion = () => { logout(); toast({ title: '¡Hasta pronto!', description: 'Energiko te espera 🐼' }); navigate('/'); };

  if (loading) return <div className="flex items-center justify-center py-20 text-purple-200 gap-2"><Loader2 className="w-5 h-5 animate-spin" /> Cargando perfil...</div>;

  const TABS = [
    { id: 'perfil', label: 'Perfil', icon: <User className="w-4 h-4" /> },
    { id: 'metas', label: 'Metas', icon: <Target className="w-4 h-4" /> },
    { id: 'ajustes', label: 'Ajustes', icon: <SettingsIcon className="w-4 h-4" /> }
  ];

  return (
    <>
      <Helmet><title>Mi Perfil - ConnectONE</title></Helmet>

      <div className="max-w-3xl mx-auto space-y-6">
        {/* Cabecera con avatar + stats */}
        <div className="bg-gradient-to-r from-purple-800/50 to-indigo-800/50 backdrop-blur rounded-2xl p-6 border border-purple-500/30">
          <div className="flex items-center gap-4">
            <img src={`/images/panda-level-${avatarSkin}.png`} alt="Avatar" className="w-20 h-20 sm:w-24 sm:h-24 object-contain drop-shadow-lg shrink-0" />
            <div className="min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-white truncate">{perfil?.nombre}</h1>
              {perfil?.bio && <p className="text-purple-200 text-sm italic">"{perfil.bio}"</p>}
              <p className="text-purple-300/60 text-xs mt-0.5">{perfil?.email}</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="bg-white/5 rounded-xl p-3 text-center"><Star className="w-4 h-4 mx-auto text-yellow-300 mb-1" /><p className="text-xl font-bold text-white">{nivel}</p><p className="text-[10px] text-purple-300/70">Nivel</p></div>
            <div className="bg-white/5 rounded-xl p-3 text-center"><Zap className="w-4 h-4 mx-auto text-cyan-300 mb-1" /><p className="text-xl font-bold text-white">{perfil?.experiencia || 0}</p><p className="text-[10px] text-purple-300/70">XP</p></div>
            <div className="bg-white/5 rounded-xl p-3 text-center"><Flame className="w-4 h-4 mx-auto text-orange-300 mb-1" /><p className="text-xl font-bold text-white">{perfil?.racha || 0}</p><p className="text-[10px] text-purple-300/70">Racha</p></div>
          </div>
        </div>

        {/* Pestañas */}
        <div className="flex gap-2 bg-white/5 rounded-xl p-1">
          {TABS.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${tab === t.id ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' : 'text-purple-300 hover:text-white'}`}>
              {t.icon} <span className="hidden sm:inline">{t.label}</span>
            </button>
          ))}
        </div>

        {/* PERFIL */}
        {tab === 'perfil' && (
          <div className="space-y-4">
            <Card className="bg-gradient-to-br from-purple-800/30 to-indigo-800/30 border-purple-500/30">
              <CardContent className="p-5 space-y-3">
                <div><Label className="text-purple-200">Nombre</Label><Input value={form.nombre} onChange={(e) => setForm((f) => ({ ...f, nombre: e.target.value }))} className="mt-1 bg-white/5 border-white/10 text-white" /></div>
                <div><Label className="text-purple-200">Biografía</Label><Textarea value={form.bio} onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))} placeholder="Una frase que te describa..." className="mt-1 bg-white/5 border-white/10 text-white min-h-[60px]" /></div>
                <div><Label className="text-purple-200 flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> Ciudad</Label><Input value={form.ciudad} onChange={(e) => setForm((f) => ({ ...f, ciudad: e.target.value }))} placeholder="Ej. Garzón, Huila" className="mt-1 bg-white/5 border-white/10 text-white" /></div>
                <Button onClick={guardar} disabled={saving} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500">
                  {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />} Guardar
                </Button>
              </CardContent>
            </Card>

            {/* Skins por nivel */}
            <Card className="bg-gradient-to-br from-purple-800/30 to-indigo-800/30 border-purple-500/30">
              <CardContent className="p-5">
                <p className="text-purple-200 text-sm mb-3 flex items-center gap-2"><Palette className="w-4 h-4" /> Tu personaje (desbloquea skins subiendo de nivel)</p>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {Array.from({ length: 16 }, (_, i) => i + 1).map((n) => {
                    const unlocked = nivel >= n;
                    const sel = avatarSkin === n;
                    return (
                      <button key={n} onClick={() => elegirSkin(n)} disabled={!unlocked}
                        className={`relative aspect-square rounded-xl border-2 p-1 transition-all ${sel ? 'border-purple-400 bg-purple-600/30' : unlocked ? 'border-white/10 bg-white/5 hover:border-purple-400/50' : 'border-transparent bg-white/5 opacity-40'}`}>
                        <img src={`/images/panda-level-${n}.png`} alt={`Nivel ${n}`} className="w-full h-full object-contain" />
                        {!unlocked && <div className="absolute inset-0 flex items-center justify-center"><Lock className="w-4 h-4 text-white/70" /></div>}
                        {sel && <CheckCircle className="absolute -top-1 -right-1 w-4 h-4 text-green-400 bg-slate-900 rounded-full" />}
                        <span className="absolute bottom-0 left-1 text-[9px] text-purple-300/70">{n}</span>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* METAS */}
        {tab === 'metas' && (
          <Card className="bg-gradient-to-br from-purple-800/30 to-indigo-800/30 border-purple-500/30">
            <CardContent className="p-5 space-y-5">
              <div>
                <Label className="text-purple-200 mb-2 block">Tu objetivo principal</Label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {OBJETIVOS.map((o) => (
                    <button key={o.value} onClick={() => setObjetivo(o.value)} className={`p-3 rounded-xl border text-left transition-all ${objetivo === o.value ? 'bg-purple-600/30 border-purple-400' : 'bg-white/5 border-white/10 hover:border-purple-400/50'}`}>
                      <span className="text-2xl">{o.emoji}</span>
                      <p className="text-white text-sm font-semibold mt-1">{o.label}</p>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <Label className="text-purple-200 mb-2 block">Tus intereses (afinan tus rutas y misiones)</Label>
                <div className="flex flex-wrap gap-2">
                  {INTERESES.map((it) => (
                    <button key={it.value} onClick={() => toggleInteres(it.value)} className={`px-3 py-2 rounded-full border text-sm transition-all ${intereses.includes(it.value) ? 'bg-purple-600/30 border-purple-400 text-white' : 'bg-white/5 border-white/10 text-purple-200 hover:border-purple-400/50'}`}>
                      {it.emoji} {it.label}
                    </button>
                  ))}
                </div>
              </div>
              <Button onClick={guardar} disabled={saving} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500">
                {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />} Guardar metas
              </Button>
            </CardContent>
          </Card>
        )}

        {/* AJUSTES */}
        {tab === 'ajustes' && (
          <div className="space-y-4">
            <Card className="bg-gradient-to-br from-purple-800/30 to-indigo-800/30 border-purple-500/30">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2"><Bell className="w-4 h-4 text-purple-300" /><span className="text-white text-sm">Notificaciones</span></div>
                  <button onClick={() => { setNotificaciones((v) => !v); api.put('/users/profile', { notificaciones: !notificaciones }).catch(() => {}); }}
                    className={`w-12 h-6 rounded-full transition-all relative ${notificaciones ? 'bg-purple-600' : 'bg-white/10'}`}>
                    <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${notificaciones ? 'left-[26px]' : 'left-0.5'}`} />
                  </button>
                </div>
                <div className="text-sm text-purple-300/70">Cuenta: <span className="text-purple-200">{perfil?.email}</span></div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-red-900/20 to-rose-900/20 border-red-500/30">
              <CardContent className="p-5">
                <Button onClick={cerrarSesion} variant="ghost" className="w-full justify-start text-red-300 hover:text-red-200 hover:bg-red-500/10">
                  <LogOut className="w-4 h-4 mr-2" /> Cerrar sesión
                </Button>
              </CardContent>
            </Card>

            <p className="text-center text-purple-400/40 text-xs">ConnectONE · Tu sistema operativo personal</p>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfilePage;
