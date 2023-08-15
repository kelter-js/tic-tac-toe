import { useState, useCallback, useEffect } from "react";

import Square from "../Square";
import getWinner from "../../utils/getWinner";

type TTurn = "X" | "O";

const Board = (): JSX.Element => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [currentTurnSign, setCurrentTurnSign] = useState<TTurn>("X");
  const [gameStatus, setGameStatus] = useState("");

  const winner = getWinner(squares);
  const nextTurnSign = currentTurnSign === "X" ? "O" : "X";

  const handleSquareClick = useCallback(
    (i: number) => {
      return () => {
        if (squares[i] || winner) {
          return;
        }

        setSquares((state) =>
          state.map((square, index) => (index === i ? currentTurnSign : square))
        );

        setCurrentTurnSign(nextTurnSign);
      };
    },
    [currentTurnSign, squares, nextTurnSign]
  );

  useEffect(() => {
    setGameStatus(
      winner ? `Winner: ${winner}` : `Next player: ${nextTurnSign}`
    );
  }, [winner, nextTurnSign]);

  return (
    <div className="board">
      <div className="status">{gameStatus}</div>
      <div className="board-row">
        {squares.slice(0, 3).map((square, index) => (
          <Square onClick={handleSquareClick(index)} value={square} />
        ))}
      </div>

      <div className="board-row">
        {squares.slice(3, 6).map((square, index) => (
          <Square onClick={handleSquareClick(3 + index)} value={square} />
        ))}
      </div>

      <div className="board-row">
        {squares.slice(6, 9).map((square, index) => (
          <Square onClick={handleSquareClick(6 + index)} value={square} />
        ))}
      </div>
    </div>
  );
};

export default Board;
