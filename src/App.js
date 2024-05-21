import React, { useState } from 'react';
import './App.css';

function App() {
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [result, setResult] = useState('');
  const [playerChoices, setPlayerChoices] = useState([]);

  const choices = ['pierre', 'papier', 'ciseaux'];

  const playGame = (playerChoice) => {
    const newPlayerChoices = [...playerChoices, playerChoice];
    setPlayerChoices(newPlayerChoices);

    const computerChoice = getComputerChoice(newPlayerChoices);

    let gameResult = '';

    if (playerChoice === computerChoice) {
      gameResult = "C'est un match nul!";
    } else if (
      (playerChoice === 'pierre' && computerChoice === 'ciseaux') ||
      (playerChoice === 'papier' && computerChoice === 'pierre') ||
      (playerChoice === 'ciseaux' && computerChoice === 'papier')
    ) {
      gameResult = `Vous gagnez! ${playerChoice} bat ${computerChoice}.`;
      setPlayerScore(playerScore + 1);
    } else {
      gameResult = `Vous perdez! ${computerChoice} bat ${playerChoice}.`;
      setComputerScore(computerScore + 1);
    }

    setResult(gameResult);
  };

  const getComputerChoice = (playerChoices) => {
    if (playerChoices.length < 3) {
      return choices[Math.floor(Math.random() * 3)];
    }

    const counts = { 'pierre': 0, 'papier': 0, 'ciseaux': 0 };
    playerChoices.forEach(choice => counts[choice]++);

    const mostFrequent = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);

    if (mostFrequent === 'pierre') {
      return 'papier';
    } else if (mostFrequent === 'papier') {
      return 'ciseaux';
    } else {
      return 'pierre';
    }
  };

  return (
    <div className="App">
      <h1>Jeu de Pierre Papier Ciseaux</h1>
      <div>
        {choices.map(choice => (
          <button key={choice} className="button" onClick={() => playGame(choice)}>
            {choice.charAt(0).toUpperCase() + choice.slice(1)}
          </button>
        ))}
      </div>
      <div id="result">{result}</div>
      <div id="score">Joueur: {playerScore} - Ordinateur: {computerScore}</div>
    </div>
  );
}

export default App;




