import React, { useCallback } from "react";
import { produce } from "immer";
const numRows = 50;
const numColumns = 50;
const App: React.FC = () => {
  const oprations = [
    [0, 1],
    [0, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
    [-1, -1],
    [1, 0],
    [-1, 0],
  ];

  const [runnig, setRunnig] = React.useState(false);
  const runnigRef = React.useRef(runnig);
  runnigRef.current = runnig;
  const runSimulation = useCallback(() => {
    if (!runnigRef.current) {
      return;
    }
    setGrid((g) => {
      return produce(g, (gridCopy) => {
        for (let i = 0; i < numRows; i++) {
          for (let k = 0; k < numColumns; k++) {
            let neighbers = 0;
            oprations.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;
              if (
                newI >= 0 &&
                newI < numRows &&
                newK >= 0 &&
                newK < numColumns
              ) {
                neighbers += g[newI][newK];
              }
            });
            if (neighbers < 2 || neighbers > 3) {
              gridCopy[i][k] = 0;
            } else if (g[i][k] === 0 && neighbers === 3) {
              gridCopy[i][k] = 1;
            }
          }
        }
      });
    });
    setTimeout(runSimulation, 1000);
  }, []);
  const [grid, setGrid] = React.useState(() => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numColumns), () => 0));
    }
    return rows;
  });

  return (
    <>
      <button
        onClick={() => {
          setRunnig(!runnig);
          if (!runnig) {
            runnigRef.current = true;
            runSimulation();
          }
        }}
      >
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
