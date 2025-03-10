import React from "react";

export default function HorizontalOptions({
  onPenSizeChange,
  onColorChange,
  onEraserSelect,
}) {

  const penSizes = [2, 4, 6, 8, 10];
  const colors = ["black", "red", "blue", "green", "orange"];

  return (
    <div className="flex items-center justify-around p-2 border-b border-gray-300">

      <div className="flex items-center">
        <span className="mr-2 font-semibold text-white">Pen Sizes:</span>
        {penSizes.map((size) => (
          <button
            key={size}
            onClick={() => onPenSizeChange(size)}
            className="mx-1 px-2 py-1 border rounded hover:bg-gray-100 text-white"
          >
            {size}
          </button>
        ))}
      </div>


      <div className="flex items-center">
        <span className="mr-2 font-semibold text-white">Colors:</span>
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => onColorChange(color)}
            className="mx-1 px-2 py-1 border rounded hover:opacity-75"
            style={{ backgroundColor: color, color: color === "black" ? "white" : "black" }}
          >
            {color}
          </button>
        ))}
      </div>


      <div>
        <button
          onClick={onEraserSelect}
          className="mx-1 px-4 py-1 border rounded hover:bg-gray-100 text-white"
        >
          Eraser
        </button>
      </div>
    </div>
  );
}
