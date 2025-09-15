import API from '../config/api';

export const missionService = {
  // Obtener todas las misiones disponibles
  async getAllMissions() {
    try {
      const response = await API.get('/missions');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo misiones:', error);
      throw error;
    }
  },

  // Obtener misiones diarias del usuario
  async getDailyMissions() {
    try {
      const response = await API.get('/missions/daily');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo misiones diarias:', error);
      throw error;
    }
  },

  // Obtener una misión específica
  async getMissionById(missionId) {
    try {
      const response = await API.get(`/missions/${missionId}`);
      return response.data;
    } catch (error) {
      console.error('Error obteniendo misión:', error);
      throw error;
    }
  },

  // Iniciar una misión
  async startMission(missionId) {
    try {
      const response = await API.post(`/missions/${missionId}/start`);
      return response.data;
    } catch (error) {
      console.error('Error iniciando misión:', error);
      throw error;
    }
  },

  // Completar una misión
  async completeMission(missionId, tiempoTomado) {
    try {
      const response = await API.post(`/missions/${missionId}/complete`, {
        tiempoTomado
      });
      return response.data;
    } catch (error) {
      console.error('Error completando misión:', error);
      throw error;
    }
  },

  // Obtener progreso del usuario
  async getUserProgress() {
    try {
      const response = await API.get('/missions/progress');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo progreso:', error);
      return { dailyCompleted: 0, weeklyCompleted: 0, streak: 0 };
    }
  },

  // Obtener programas disponibles
  async getPrograms() {
    try {
      const response = await API.get('/missions/programs');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo programas:', error);
      throw error;
    }
  },

  // Unirse a un programa
  async joinProgram(programId) {
    try {
      const response = await API.post(`/missions/programs/${programId}/join`);
      return response.data;
    } catch (error) {
      console.error('Error uniéndose al programa:', error);
      throw error;
    }
  }
};