import React from "react";
import "./Grid.css";
import "animate.css"; // Keep animate.css for animations
import { Node } from "../index"; // Adjusted for the import as per your structure

// Define the Cell interface
interface Cell {
  row: number;
  column: number;
  value: number;
  isValid: boolean;
  isModifiable: boolean;
  isHinted: boolean;
}

interface GridProps {
  grid: Cell[][]; // 2D array of Cell objects
  handleCellClick: (row: number, column: number, isModifiable: boolean) => void; // Correct function signature
}

const Grid: React.FC<GridProps> = ({ grid, handleCellClick }) => {
  return (
    <table className="grid-table">
      <tbody>
        {grid &&
          grid.map((row, rowIndex) => {
            return (
              <tr
                className="row animate__animated animate__fadeIn"
                key={rowIndex}
              >
                {" "}
                {/* Added animation */}
                {row.map((cell, columnIndex) => {
                  return (
                    <Node
                      key={`${rowIndex}-${columnIndex}`} // Unique key for each cell
                      cell={cell} // Pass cell object to Node
                      handleClickCallback={
                        (
                          rowIndex: number,
                          columnIndex: number,
                          isModifiable: boolean
                        ) =>
                          handleCellClick(rowIndex, columnIndex, isModifiable) // Correct function signature
                      }
                    />
                  );
                })}
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default Grid;
