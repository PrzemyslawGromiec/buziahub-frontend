import type { ChangeEvent } from "react";
import "./IOSSwitch.css";

type IOSSwitchProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
};

export default function IOSSwitch({
  checked,
  onChange,
  label,
}: IOSSwitchProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onChange(event.target.checked);
  }

  return (
    <label className="ios-switch">
      <input
        type="checkbox"
        role="switch"
        checked={checked}
        onChange={handleChange}
      />

      <span className="ios-switch__track" aria-hidden="true">
        <span className="ios-switch__thumb" />
      </span>

      {label && <span className="ios-switch__label">{label}</span>}
    </label>
  );
}