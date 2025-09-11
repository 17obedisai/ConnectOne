import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        } catch (e) {
            console.error("Failed to parse user from localStorage", e);
            localStorage.removeItem('user');
        } finally {
            setLoading(false);
        }
    }, []);

    const signIn = async (email, password) => {
        const users = JSON.parse(localStorage.getItem('users')) || {};
        const existingUser = Object.values(users).find(u => u.email === email);

        if (existingUser && existingUser.password === password) {
            const user_data = { id: existingUser.id, email: existingUser.email, fullName: existingUser.fullName, createdAt: existingUser.createdAt };
            setUser(user_data);
            localStorage.setItem('user', JSON.stringify(user_data));
            return { success: true, user: user_data };
        }
        return { success: false, message: 'Email o contraseña incorrectos.' };
    };

    const signUp = async (email, password, fullName) => {
        let users = JSON.parse(localStorage.getItem('users')) || {};
        const emailExists = Object.values(users).some(u => u.email === email);

        if (emailExists) {
            return { success: false, message: 'Un usuario con este email ya existe.' };
        }

        const id = `user_${Date.now()}`;
        users[id] = { id, email, password, fullName, createdAt: new Date().toISOString() };
        
        // Initialize user data
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem(`stats_${id}`, JSON.stringify({
            level: 1,
            xp: 0,
            xp_to_next_level: 1000,
            streak: 0,
            achievements_unlocked: 0
        }));
        localStorage.setItem(`customization_${id}`, JSON.stringify({ accessories: { hat: 'none', glasses: 'none', necklace: 'none', skin: 'default' } }));

        return { success: true };
    };

    const signOut = async () => {
        setUser(null);
        localStorage.removeItem('user');
    };
    
    const updateUser = (updatedData) => {
        if (user) {
            const updatedUser = { ...user, ...updatedData };
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));

            let users = JSON.parse(localStorage.getItem('users')) || {};
            if(users[user.id]) {
                users[user.id] = {...users[user.id], ...updatedData};
                localStorage.setItem('users', JSON.stringify(users));
            }
        }
    };


    const value = {
        user,
        loading,
        signIn,
        signUp,
        signOut,
        updateUser
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};