import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, Share } from 'lucide-react';

// Banner para instalar la app en el celular (Android/Chrome) o pista para iOS.
const InstallPWA = () => {
  const [deferred, setDeferred] = useState(null);
  const [visible, setVisible] = useState(false);
  const [iosHint, setIosHint] = useState(false);

  useEffect(() => {
    const standalone =
      window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
    if (standalone) return; // ya está instalada

    const onBIP = (e) => {
      e.preventDefault();
      setDeferred(e);
      setVisible(true);
    };
    window.addEventListener('beforeinstallprompt', onBIP);
    window.addEventListener('appinstalled', () => setVisible(false));

    // iOS/Safari no soporta beforeinstallprompt: mostramos una pista (una vez por sesión).
    const isIOS = /iphone|ipad|ipod/i.test(window.navigator.userAgent);
    if (isIOS && !sessionStorage.getItem('iosHintShown')) {
      setIosHint(true);
      setVisible(true);
    }

    return () => window.removeEventListener('beforeinstallprompt', onBIP);
  }, []);

  const instalar = async () => {
    if (!deferred) return;
    deferred.prompt();
    await deferred.userChoice;
    setDeferred(null);
    setVisible(false);
  };

  const cerrar = () => {
    setVisible(false);
    if (iosHint) sessionStorage.setItem('iosHintShown', '1');
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 60 }}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[200] w-[92%] max-w-sm"
        >
          <div className="bg-slate-900/95 backdrop-blur-xl border border-purple-500/30 rounded-2xl shadow-2xl p-4 flex items-center gap-3">
            <img src="/icons/icon-192.png" alt="ConnectONE" className="w-11 h-11 rounded-xl shrink-0" />
            <div className="flex-1 min-w-0">
              {iosHint ? (
                <p className="text-sm text-purple-100 leading-snug">
                  Instala ConnectONE: toca <Share className="w-3.5 h-3.5 inline mx-0.5" /> y luego <span className="font-semibold">"Añadir a inicio"</span>.
                </p>
              ) : (
                <>
                  <p className="text-sm font-bold text-white leading-tight">Instala ConnectONE</p>
                  <p className="text-xs text-purple-300/80">Tenla en tu celular como una app.</p>
                </>
              )}
            </div>
            {!iosHint && (
              <button
                onClick={instalar}
                className="shrink-0 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-sm font-semibold rounded-xl px-3 py-2 flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" /> Instalar
              </button>
            )}
            <button onClick={cerrar} className="shrink-0 text-purple-300/50 hover:text-purple-200">
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InstallPWA;
