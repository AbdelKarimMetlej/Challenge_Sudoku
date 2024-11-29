import React from "react";
import "./Button.css";

const STYLES = [
  "btn--primary--solid",
  "btn--warning--solid",
  "btn--danger--solid",
  "btn--success--solid",
  "btn--primary--outline",
  "btn--warning--outline",
  "btn--danger--outline",
  "btn--success--outline",
];

// Define the props using TypeScript
interface ButtonProps {
  text: string; // The text displayed on the button
  type?: "button" | "submit" | "reset"; // The type of button (optional)
  onClick?: () => void; // Event handler for button clicks
  buttonStyle?: string; // Optional button style class
}

const Button: React.FC<ButtonProps> = ({
  text,
  type = "button",
  onClick,
  buttonStyle,
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle || "")
    ? buttonStyle
    : STYLES[0];

  return (
    <button className={`btn ${checkButtonStyle}`} onClick={onClick} type={type}>
      {text}
    </button>
  );
};

export default Button;
