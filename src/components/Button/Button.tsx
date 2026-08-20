import type React from "react";
import "./Button.css";

type ButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    isActive?: boolean;
};

export default function Button({
    children,
    onClick,
    disabled = false,
    type = "button",
    isActive = false,
}: ButtonProps) {
    return (
        <button
            className={`button${isActive ? " button-active" : ""}`}
            type={type}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}