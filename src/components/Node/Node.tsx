import React from "react";
import "./Node.css"; // Keep this import for cell styling

// Define the Cell interface (same as Grid)
interface Cell {
  row: number;
  column: number;
  value: number;
  isValid: boolean;
  isModifiable: boolean;
  isHinted: boolean;
}

interface NodeProps {
  cell: Cell; // Expecting a Cell object here
  handleClickCallback: (
    row: number,
    column: number,
    isModifiable: boolean
  ) => void; // Click handler function
}

const Node: React.FC<NodeProps> = ({ cell, handleClickCallback }) => {
  const getCellClassName = (cell: Cell): string => {
    const { row, column } = cell;
    let className = `cell 
    ${row === 2 || row === 5 ? "bottom-border" : ""}
    ${column === 2 || column === 5 ? "right-border" : ""}
    ${cell.isValid ? "" : "cell-invalid"}
    ${cell.isModifiable ? "cell-modifiable" : ""}
    ${cell.isHinted ? "cell-hinted" : ""}`;
    return className;
  };

  return (
    <td
      className={getCellClassName(cell)} // Dynamically applied class name
      onClick={() =>
        handleClickCallback(cell.row, cell.column, cell.isModifiable)
      } // Trigger click callback
    >
      {cell.value !== 0 ? cell.value : ""} {/* Display value if not zero */}
    </td>
  );
};

export default Node;
