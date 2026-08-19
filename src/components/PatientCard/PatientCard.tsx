import Button from "../Button/Button";
import "./PatientCard.css";
import { useEffect, useState } from "react";
import type { Patient } from "../../types/Patient";

type PatientCardProps = {
  patient: Patient;
  onEdit: (newFirstName: string) => void;
  onArchive: () => void;
  showDetails?: boolean;
};

function PatientCard({ patient, onEdit, onArchive, showDetails }: PatientCardProps) {
  const [newFirstName, setNewFirstName] = useState(patient.firstName);
  const trimmedFirstName = newFirstName.trim();
  const isSaveDisabled = !trimmedFirstName || trimmedFirstName === patient.firstName;
  useEffect(() => {
    setNewFirstName(patient.firstName);
  }, [patient.id, patient.firstName]);

  function handleEditClick() {
    if (isSaveDisabled) {
      return;
    }
    onEdit(trimmedFirstName);
    setNewFirstName(trimmedFirstName);
  }

  return (
    <div className="patient-card">
      <h3>Patient Card</h3>

      <p>
        Name: {patient.firstName} {patient.lastName}
      </p>

      <p>Age: {patient.age}</p>
      <p>Status: {patient.active ? "Active" : "Archived"}</p>

      {showDetails && <p>Details: {patient.details}</p>}

      <label className="label">
        Edit First Name:
        <input
          type="text"
          value={newFirstName}
          onChange={(e) => setNewFirstName(e.target.value)}
        />
      </label>

      <Button 
      onClick={handleEditClick} 
      disabled={isSaveDisabled}>
        Save first name
      </Button>

      <Button onClick={onArchive}>{patient.active ? "Archive" : "Restore"}</Button>
    </div>
  );
}

export default PatientCard;