export default function IOSSwitch({
    checked,
    onChange,
    label,
}) {
  
  function handleChange(event) {
    onChange(event.target.checked);
  }

    return (
        <label className="ios-switch">
            <input 
                type="checkbox" 
                checked={checked} 
                onChange={handleChange} 
            />
            <span className="ios-switch__track">
                <span className="ios-switch__thumb"></span>
            </span>

            {label && (
        <span className="ios-switch__label">
          {label}
        </span>
      )}
    </label>
  );
}
