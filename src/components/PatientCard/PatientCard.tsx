import "./PatientCard.css";
import type { Patient } from "../../types/Patient";

type PatientCardProps = {
  patient: Patient;
};

export default function PatientCard({ patient }: PatientCardProps) {
  return (
    <div className="patient-card">
      <h3>Patient Card</h3>

      <p>
        Name: {patient.firstName} {patient.lastName}
      </p>

      <p>Age: {patient.age}</p>
      <p>Status: {patient.isActive ? "Active" : "Archived"}</p>
    </div>
  );
}