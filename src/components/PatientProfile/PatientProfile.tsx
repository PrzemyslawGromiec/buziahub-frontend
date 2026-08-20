import { useState } from "react";
import type { Patient } from "../../types/Patient";
import IOSSwitch from "../IOSSwitch/IOSSwitch";
import PatientCard from "../PatientCard/PatientCard";
import PatientDetailsForm from "../PatientDetailsForm/PatientDetailsForm";
import "./PatientProfile.css";

type PatientProfileProps = {
  patient: Patient;
  onUpdateDetails: (newDetails: string) => void;
  onEditFirstName: (newFirstName: string) => void;
  onArchive: () => void;
};

export default function PatientProfile({
  patient,
  onUpdateDetails,
  onEditFirstName,
  onArchive,
}: PatientProfileProps) {
  const [showDetails, setShowDetails] = useState(true);
  const [detailsDraft, setDetailsDraft] = useState("");

  function handleSubmitDetails() {
    const trimmedDetails = detailsDraft.trim();

    if (!trimmedDetails) {
      return;
    }

    onUpdateDetails(trimmedDetails);
    setDetailsDraft("");
  }

  return (
    <section className="patient-profile">
      <IOSSwitch
        checked={showDetails}
        onChange={setShowDetails}
        label="Show patient details"
      />

      <PatientCard
        patient={patient}
        showDetails={showDetails}
        onEdit={onEditFirstName}
        onArchive={onArchive}
      />

      <PatientDetailsForm
        details={detailsDraft}
        onDetailsChange={setDetailsDraft}
        onSubmit={handleSubmitDetails}
      />
    </section>
  );
}
