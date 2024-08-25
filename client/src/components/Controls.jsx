// In Controls.jsx
import React, { useState } from 'react';

function Controls({ onCreateGame, onJoinGame, onSetupTeam, gameId }) {
  const [joinId, setJoinId] = useState('');
  const [team, setTeam] = useState(['P1', 'P2', 'H1', 'H2', 'P3']);

  const handleJoin = () => {
    if (joinId) onJoinGame(joinId);
  };

  const handleSetupTeam = () => {
    if (team.length === 5) {
      console.log('Setting up team:', team);
      onSetupTeam(team);
    } else {
      console.error('Invalid team setup. Team must have exactly 5 pieces.');
    }
  };

  return (
    <div className="controls">
      <button onClick={onCreateGame}>Create Game</button>
      <input 
        type="text" 
        value={joinId} 
        onChange={(e) => setJoinId(e.target.value)} 
        placeholder="Game ID"
      />
      <button onClick={handleJoin}>Join Game</button>
      {gameId && (
        <>
          <input 
            type="text" 
            value={team.join(',')} 
            onChange={(e) => setTeam(e.target.value.split(',').map(item => item.trim()))} 
            placeholder="Team setup (e.g. P1,P2,H1,H2,P3)"
          />
          <button onClick={handleSetupTeam}>Setup Team</button>
        </>
      )}
    </div>
  );
}

export default Controls;