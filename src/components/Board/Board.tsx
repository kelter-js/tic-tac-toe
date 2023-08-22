import { useState, useCallback, useEffect } from "react";

import Square from "../Square";
import getWinner from "../../utils/getWinner";

type TTurn = "X" | "O";

interface IBoardProps {
  squares: Array<null>;
  onTurn: (squares: Array<null | string>) => void;
  winner: string | null;
  gameStatus: string;
}

const Board = ({
  squares,
  onTurn,
  winner,
  gameStatus,
}: IBoardProps): JSX.Element => {
  const [currentTurnSign, setCurrentTurnSign] = useState<TTurn>("X");

  const nextTurnSign = currentTurnSign === "X" ? "O" : "X";

  const handleSquareClick = useCallback(
    (i: number) => {
      return () => {
        if (squares[i] || winner) {
          return;
        }

        setCurrentTurnSign(nextTurnSign);
        onTurn(
          squares.map((square, index) =>
            index === i ? currentTurnSign : square
          )
        );
      };
    },
    [currentTurnSign, squares, nextTurnSign]
  );

  return (
    <div className="board">
      <div className="status">
        {gameStatus || `Next player: ${nextTurnSign}`}
      </div>
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
