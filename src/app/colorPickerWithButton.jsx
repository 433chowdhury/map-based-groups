"use client";

import { HexColorPicker } from "react-colorful";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export const ColorPickerWithButton = ({
  buttonContent = "",
  buttonClassName = "",
  onChange = () => {},
  defaultColor = "",
}) => {
  const [color, setColor] = useState(defaultColor);

  const handleColorChange = (newColor) => {
    setColor(newColor);
    onChange(newColor);
  };

  return (
    <div className="relative flex justify-center items-center [&:nth-child(2)]:*:focus-within:block">
      <button
        className={twMerge("btn-sm btn-circle shadow-md border", buttonClassName)}
        style={{ background: color }}
      >
        {buttonContent}
      </button>
      <div className="absolute top-11 right-0 hidden">
        <HexColorPicker color={color} onChange={handleColorChange} />
      </div>
    </div>
  );
};
