import React from "react";
import type { Patient } from "../../types/Patient";
import "./PatientSelector.css";

type PatientSelectorProps = {
  patients: Patient[];
  selectedPatientId: number | null;
  onSelectPatient: (patientId: number) => void;
};

export default function PatientSelector({
  patients,
  selectedPatientId,
  onSelectPatient,
}: PatientSelectorProps) {
  return (
    <section>
      <h2>Patients</h2>
      <div className="patient-selector">
        {patients.map((patient) => (
          <button
            key={patient.id}
            type="button"
            className={
              patient.id === selectedPatientId
                ? "patient-button patient-button-selected"
                : "patient-button"
            }
            onClick={() => onSelectPatient(patient.id)}
          >
            {patient.firstName} {patient.lastName}
          </button>
        ))}
      </div>
    </section>
  );
}
