interface ISquareProps {
  value: string | null;
  onClick: VoidFunction;
}

const Square = ({ value, onClick }: ISquareProps): JSX.Element => {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
};

export default Square;
