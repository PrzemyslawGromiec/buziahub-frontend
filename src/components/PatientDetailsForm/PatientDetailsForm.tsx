import type { SubmitEvent } from "react";
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
  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form className="update-details" onSubmit={handleSubmit}>
      <label htmlFor="patient-details">
        Update patient details:
      </label>

      <textarea
        id="patient-details"
        value={details}
        placeholder="Enter new patient details"
        onChange={(event) => onDetailsChange(event.target.value)}
      />

      <Button type="submit" disabled={!details.trim()}>
        Update details
      </Button>
    </form>
  );
}