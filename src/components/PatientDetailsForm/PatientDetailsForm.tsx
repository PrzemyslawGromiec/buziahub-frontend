import Button from "../Button/Button";
import "./PatientDetailsForm.css";

type PatientDetailsFormProps = {
  details: string;
  onDetailsChange: (newDetails: string) => void;
  onSubmit: () => void;
};

export default function PatientDetailsForm({
  details,
  onDetailsChange,
  onSubmit,
}: PatientDetailsFormProps) {
  return (
    <div className="update-details">
      <label htmlFor="patient-details">Update patient details:</label>

      <textarea
        id="patient-details"
        value={details}
        placeholder="Enter new patient details"
        onChange={(event) => onDetailsChange(event.target.value)}
      />

      <Button onClick={onSubmit} disabled={!details.trim()}>
        Update details
      </Button>
    </div>
  );
}
