import type React from "react";
import "./Button.css";

type ButtonProps = {
    children: React.ReactNode;
    onClick: () => void;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
};

export default function Button({
    children,
    onClick,
    disabled = false,
    type = "button",
}: ButtonProps) {
    return (
        <button
            className="button"
            type={type}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}