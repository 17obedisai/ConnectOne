import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState(null);
    const [stats, setStats] = useState(null);
    const [customization, setCustomization] = useState(null);
    const [completedActivities, setCompletedActivities] = useState([]);
    const [achievements, setAchievements] = useState([]);

    const fetchData = useCallback(() => {
        if (!user) {
            setLoading(false);
            return;
        }

        setLoading(true);
        try {
            const userProfile = JSON.parse(localStorage.getItem(`profile_${user.id}`)) || {};
            const userStats = JSON.parse(localStorage.getItem(`stats_${user.id}`)) || {
                level: 1,
                xp: 0,
                xp_to_next_level: 1000,
                streak: 0,
                achievements_unlocked: 0,
            };
            const userCustomization = JSON.parse(localStorage.getItem(`customization_${user.id}`)) || { items: [] };
            const userActivities = JSON.parse(localStorage.getItem(`activities_${user.id}`)) || {};
            const userAchievements = JSON.parse(localStorage.getItem(`achievements_${user.id}`)) || [];
            
            const today = new Date().toISOString().slice(0, 10);
            const todaysActivities = userActivities[today] || [];
            
            setProfile({ full_name: user.fullName, ...userProfile });
            setStats(userStats);
            setCustomization(userCustomization);
            setCompletedActivities(todaysActivities);
            setAchievements(userAchievements);

        } catch (error) {
            console.error("Error fetching user data from localStorage:", error);
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        fetchData();
    }, [user, fetchData]);
    
    const value = {
        loading,
        profile,
        stats,
        customization,
        completedActivities,
        achievements,
        refreshData: fetchData
    };

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};