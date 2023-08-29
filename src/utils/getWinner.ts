export interface IResult {
  squareSign: string;
  isGameOver: boolean;
  coords: number[];
}

const getWinner = (squares: Array<string | null>) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const result: IResult = {
    coords: [],
    isGameOver: false,
    squareSign: "",
  };

  lines.forEach((line) => {
    const [a, b, c] = line;

    if (result.isGameOver) return;

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      result.squareSign = squares[a]!;
      result.isGameOver = true;
      result.coords.push(...line);
    }
  });

  return result.isGameOver ? result : null;
};

export default getWinner;
