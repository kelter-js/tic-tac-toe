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

  let result: undefined | string;

  lines.forEach((line) => {
    const [a, b, c] = line;

    if (result) return;

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      result = squares[a]!;
    }
  });

  return result || null;
};

export default getWinner;
