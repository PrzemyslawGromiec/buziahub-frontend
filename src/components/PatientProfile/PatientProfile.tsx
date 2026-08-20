import { useState } from "react";

import type { Patient } from "../../types/Patient";

import Button from "../Button/Button";
import PatientCard from "../PatientCard/PatientCard";
import PatientDetailsForm from "../PatientDetailsForm/PatientDetailsForm";

import "./PatientProfile.css";

type PatientProfileAction =
  | "SHOW_DETAILS"
  | "EDIT_NAME"
  | "UPDATE_DETAILS"
  | "ARCHIVE";

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
  const [detailsDraft, setDetailsDraft] = useState("");
  const [newFirstName, setNewFirstName] = useState(patient.firstName);

  const [activeAction, setActiveAction] = useState<PatientProfileAction | null>(null);

  function toggleAction(action: PatientProfileAction) {
    if (activeAction === "EDIT_NAME") {
      setNewFirstName(patient.firstName);
    }

    if (activeAction === "UPDATE_DETAILS") {
      setDetailsDraft("");
    }

    setActiveAction(activeAction === action ? null : action);
  }

  function handleSubmitFirstName() {
    const trimmedFirstName = newFirstName.trim();

    if (!trimmedFirstName || trimmedFirstName === patient.firstName) {
      return;
    }

    onEditFirstName(trimmedFirstName);
    setNewFirstName(trimmedFirstName);
    setActiveAction(null);
  }

  function handleSubmitDetails() {
    const trimmedDetails = detailsDraft.trim();

    if (!trimmedDetails) {
      return;
    }

    onUpdateDetails(trimmedDetails);
    setDetailsDraft("");
    setActiveAction(null);
  }

  function handleArchive() {
    onArchive();
    setActiveAction(null);
  }

  function handleCancelNameEdit() {
    setNewFirstName(patient.firstName);
    setActiveAction(null);
  }

  function handleCancelDetailsEdit() {
    setDetailsDraft("");
    setActiveAction(null);
  }

  function renderActionPanel() {
    switch (activeAction) {
      case "SHOW_DETAILS":
        return (
          <div className="patient-action-panel">
            <h3>Patient details</h3>
            <p>{patient.details || "No details available."}</p>
          </div>
        );

      case "EDIT_NAME":
        return (
          <div className="patient-action-panel">
            <label htmlFor="patient-first-name">First name:</label>

            <input
              id="patient-first-name"
              type="text"
              value={newFirstName}
              onChange={(event) => setNewFirstName(event.target.value)}
            />

            <div className="patient-action-panel__buttons">
              <Button
                onClick={handleSubmitFirstName}
                disabled={
                  !newFirstName.trim() ||
                  newFirstName.trim() === patient.firstName
                }
              >
                Save name
              </Button>

              <Button onClick={handleCancelNameEdit}>Cancel</Button>
            </div>
          </div>
        );

      case "UPDATE_DETAILS":
        return (
          <div className="patient-action-panel">
            <PatientDetailsForm
              details={detailsDraft}
              onDetailsChange={setDetailsDraft}
              onSubmit={handleSubmitDetails}
            />

            <Button onClick={handleCancelDetailsEdit}>Cancel</Button>
          </div>
        );

      case "ARCHIVE":
        return (
          <div className="patient-action-panel">
            <p>
              Are you sure you want to{" "}
              {patient.isActive ? "archive" : "restore"} {patient.firstName}{" "}
              {patient.lastName}?
            </p>

            <div className="patient-action-panel__buttons">
              <Button onClick={handleArchive}>
                Confirm {patient.isActive ? "archive" : "restore"}
              </Button>

              <Button onClick={() => setActiveAction(null)}>Cancel</Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  }

  return (
    <section className="patient-profile">
      <PatientCard patient={patient} />

      <div className="patient-profile-actions">
        <Button
          isActive={activeAction === "SHOW_DETAILS"}
          onClick={() => toggleAction("SHOW_DETAILS")}
        >
          {activeAction === "SHOW_DETAILS" ? "Hide details" : "Show details"}
        </Button>

        <Button
          isActive={activeAction === "EDIT_NAME"}
          onClick={() => toggleAction("EDIT_NAME")}
        >
          Edit name
        </Button>

        <Button
          isActive={activeAction === "UPDATE_DETAILS"}
          onClick={() => toggleAction("UPDATE_DETAILS")}
        >
          Update details
        </Button>

        <Button
          isActive={activeAction === "ARCHIVE"}
          onClick={() => toggleAction("ARCHIVE")}
        >
          {patient.isActive ? "Archive" : "Restore"}
        </Button>
      </div>

      <div className="patient-profile-action-panel">{renderActionPanel()}</div>
    </section>
  );
}
