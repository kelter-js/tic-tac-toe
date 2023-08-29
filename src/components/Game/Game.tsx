import { useState, useCallback, useEffect } from "react";

import Board from "../Board";
import getWinner from "../../utils/getWinner";

const Game = (): JSX.Element => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [gameStatus, setGameStatus] = useState("");
  const [currentMove, setCurrentMove] = useState(0);
  const isNextMoveX = currentMove % 2 === 0;

  const currentSquares = history[currentMove];
  const winner = getWinner(currentSquares);
  console.log("winner:", winner);

  const handleJumpToTurn = useCallback((move: number) => {
    setCurrentMove(move);
  }, []);

  const handleTurn = useCallback(
    (nextSquares: Array<null | string>) => {
      const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
      setHistory(nextHistory);
      setCurrentMove(nextHistory.length - 1);
    },
    [history, currentMove]
  );

  useEffect(() => {
    setGameStatus(winner ? `Winner: ${winner.squareSign}` : "");
  }, [winner]);

  const renderMoves = history.map((_, move) => {
    const description = move > 0 ? `Go to move #${move}` : "Go to game start";

    return (
      <li key={move}>
        <button onClick={() => handleJumpToTurn(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={currentSquares}
          onTurn={handleTurn}
          winner={winner}
          gameStatus={gameStatus}
          isNextMoveX={isNextMoveX}
        />
      </div>
      <div className="game-info">
        <ol>{renderMoves}</ol>
      </div>
    </div>
  );
};

export default Game;
