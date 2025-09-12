import API from '../config/api';

export const missionService = {
  async getDailyMissions() {
    const response = await API.get('/missions/daily');
    return response.data;
  },

  async completeMission(missionId, tiempoTomado) {
    const response = await API.post(`/missions/${missionId}/complete`, {
      tiempoTomado
    });
    return response.data;
  }
};