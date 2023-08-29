import { useState, useCallback } from "react";

import { IResult } from "../../utils/getWinner";
import Square from "../Square";

type TTurn = "X" | "O";

interface IBoardProps {
  squares: Array<null>;
  onTurn: (squares: Array<null | string>) => void;
  winner: IResult | null;
  gameStatus: string;
  isNextMoveX: boolean;
}

const getNextSign = (isNextMoveX: boolean) => (isNextMoveX ? "X" : "O");
const getHighlightIndex = (min: number, max: number, winnerCoords?: number[]) => {
  return winnerCoords ? winnerCoords.filter(item => item <= max && item >= min) : null;
}

const Board = ({
  squares,
  onTurn,
  winner,
  gameStatus,
  isNextMoveX,
}: IBoardProps): JSX.Element => {
  const nextTurnSign = getNextSign(isNextMoveX);
  const [currentTurnSign, setCurrentTurnSign] = useState<TTurn>(nextTurnSign);

  const handleSquareClick = useCallback(
    (i: number) => {
      return () => {
        if (squares[i] || winner?.isGameOver) {
          return;
        }

        setCurrentTurnSign(getNextSign(!isNextMoveX));
        onTurn(
          squares.map((square, index) =>
            index === i ? currentTurnSign : square
          )
        );
      };
    },
    [currentTurnSign, squares, nextTurnSign]
  );

  console.log(winner?.coords);

  return (
    <div className="board">
      <div className="status">
        {gameStatus || `Next player: ${nextTurnSign}`}
      </div>
      <div className="board-row">
        {squares.slice(0, 3).map((square, index) => (
          <Square
            onClick={handleSquareClick(index)}
            value={square}
            key={index}
            isHighlighted={winner?.coords.includes(index) ?? false}
          />
        ))}
      </div>

      <div className="board-row">
        {squares.slice(3, 6).map((square, index) => (
          <Square
            onClick={handleSquareClick(3 + index)}
            value={square}
            key={index}
            isHighlighted={winner?.coords.includes(index + 3) ?? false}
          />
        ))}
      </div>

      <div className="board-row">
        {squares.slice(6, 9).map((square, index) => (
          <Square
            onClick={handleSquareClick(6 + index)}
            value={square}
            key={index}
            isHighlighted={winner?.coords.includes(index + 6) ?? false}
          />
        ))}
      </div>
    </div>
  );
};

export default Board;
