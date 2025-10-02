    // src/pages/NotFoundPage.jsx
    import React from 'react';
    import { motion } from 'framer-motion';
    import { useNavigate } from 'react-router-dom';
    import { Button } from '@/components/ui/button';
    import { Home, ArrowLeft } from 'lucide-react';

    const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <motion.div 
            className="text-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
            animate={{ 
                y: [0, -20, 0],
                rotate: [-5, 5, -5]
            }}
            transition={{ 
                duration: 4, 
                repeat: Infinity
            }}
            className="mb-8"
            >
            <span className="text-8xl">🐼</span>
            </motion.div>

            <h1 className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
            404
            </h1>
            
            <p className="text-2xl text-white mb-4">
            ¡Ups! Página no encontrada
            </p>
            
            <p className="text-purple-200 mb-8">
            Parece que el panda se perdió explorando.
            </p>

            <div className="flex gap-4 justify-center">
            <Button
                onClick={() => navigate(-1)}
                variant="outline"
                className="border-purple-500 text-white hover:bg-purple-800/30"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver
            </Button>

            <Button
                onClick={() => navigate('/')}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white"
            >
                <Home className="w-4 h-4 mr-2" />
                Inicio
            </Button>
            </div>
        </motion.div>
        </div>
    );
    };

    export default NotFoundPage;