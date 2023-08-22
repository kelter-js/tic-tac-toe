import { useState, useCallback, useEffect } from "react";

import Board from "../Board";
import getWinner from "../../utils/getWinner";

const Game = (): JSX.Element => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [gameStatus, setGameStatus] = useState("");

  const currentSquares = history[history.length - 1];
  const winner = getWinner(currentSquares);

  const handleJumpToTurn = useCallback((move: number) => {}, []);

  const handleTurn = useCallback(
    (nextSquares: Array<null | string>) => {
      setHistory([...history, nextSquares]);
    },
    [history]
  );

  useEffect(() => {
    setGameStatus(winner ? `Winner: ${winner}` : "");
  }, [winner]);

  const renderMoves = history.map((_, move) => {
    const description = move > 0 ? `Go to move #${move}` : "Go to game start";

    return (
      <li>
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
        />
      </div>
      <div className="game-info">
        <ol>{renderMoves}</ol>
      </div>
    </div>
  );
};

export default Game;
