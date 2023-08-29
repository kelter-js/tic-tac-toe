interface ISquareProps {
  value: string | null;
  onClick: VoidFunction;
  isHighlighted: boolean;
}

const Square = ({
  value,
  onClick,
  isHighlighted,
}: ISquareProps): JSX.Element => {
  return (
    <button
      className={`square ${isHighlighted ? "squareHighlighted" : ""}`}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default Square;
