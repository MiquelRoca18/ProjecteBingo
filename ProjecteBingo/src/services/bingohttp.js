import {
    createData, getData,
  } from './http.js';
  
  export {
    saveGameState, loadGameState, getAllSavedGames
  };
  
  const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqc2Rhd2Jkdmt1d25zZmJ3bXhoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMjYyNTI1OSwiZXhwIjoyMDE4MjAxMjU5fQ.DLiuwba_GYm517qQOs4uP1o4MeoKPvTKCm5zvHHYDUA';

    function saveGameState(state) {
        try {
            const token = localStorage.getItem('access_token');
            const gameState = {
                player_marked_numbers: state.playerMarkedNumbers,
                cpu_marked_numbers: state.cpuMarkedNumbers,
                bombo_state: state.bomboState,
                number_cartones: state.numberCartones,
                numbers_carton_player: state.playerCartonNumbers,
                numbers_carton_cpu: state.cpuCartonNumbers,
                uid_player: state.playerId
            };

            createData('game_states', token, gameState)
                .then(() => {
                    console.log('Estado del juego guardado exitosamente.');
                })
                .catch((error) => {
                    console.error('Error al guardar el estado del juego:', error);
                });
        } catch (error) {
            console.error('Error en saveGameState:', error);
        }
    }
  async function loadGameState(gameId) {
    try {
        const token = localStorage.getItem('access_token');
        console.log(gameId);
        const gameState = await getData(`game_states?id=eq.${gameId}&select=*`, token);
        return gameState[0];
    } catch (error) {
        console.error('Error en loadGameState:', error);
        return null;
    }
}

async function getAllSavedGames() {
    try {
        const token = localStorage.getItem('access_token');
        const savedGames = await getData('game_states', token); 
        return savedGames;
    } catch (error) {
        console.error('Error in getAllSavedGames:', error);
        return [];
    }
}