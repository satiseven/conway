import React from "react";
import { produce } from "immer";
const numRows = 50;
const numColumns = 50;
const App: React.FC = () => {
  const [grid, setGrid] = React.useState(() => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numColumns), () => 0));
    }
    return rows;
  });
  const [runnig, setRunnig] = React.useState(false);
  return (
    <>
      <button onClick={() => setRunnig(!runnig)}>
        {runnig ? "Stop" : "Start"}
      </button>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${numColumns},20px)`,
        }}
      >
        {grid.map((rows, ri) =>
          rows.map((col, ci) => (
            <div
              key={`${ri}${ci}`}
              onClick={() => {
                const newGrid = produce(grid, (gridCopy) => {
                  gridCopy[ri][ci] = grid[ri][ci] ? 0 : 1;
                });
                setGrid(newGrid);
              }}
              style={{
                height: "20px",
                width: "20px",
                backgroundColor: grid[ri][ci] ? "pink" : undefined,
                border: "solid 1px black",
              }}
            />
          ))
        )}
      </div>
    </>
  );
};
export default App;
