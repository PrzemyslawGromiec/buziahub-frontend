import { useState } from "react";
import PatientProfile from "./components/PatientProfile/PatientProfile";
import PatientSelector from "./components/PatientSelector/PatientSelector";
import type { Patient } from "./types/Patient";
import { generatePatients } from "./utils/generatePatients";
import "./App.css";

export default function App() {
  const [patients, setPatients] = useState<Patient[]>(
    () => generatePatients(20),
  );

  const [selectedPatientId, setSelectedPatientId] =
    useState<number | null>(null);

  const selectedPatient =
    patients.find(
      (patient) => patient.id === selectedPatientId,
    ) ?? null;

  function handleSelectPatient(patientId: number) {
    setSelectedPatientId(patientId);
  }

  function updateSelectedPatient(
    update: (patient: Patient) => Patient,
  ) {
    if (selectedPatientId === null) {
      return;
    }

    setPatients((previousPatients) =>
      previousPatients.map((patient) =>
        patient.id === selectedPatientId
          ? update(patient)
          : patient,
      ),
    );
  }

  function handleUpdateDetails(newDetails: string) {
    updateSelectedPatient((patient) => ({
      ...patient,
      details: newDetails.trim(),
    }));
  }

  function handleActivePatient() {
    updateSelectedPatient((patient) => ({
      ...patient,
      isActive: !patient.isActive,
    }));
  }

  function editPatientFirstName(newFirstName: string) {
    updateSelectedPatient((patient) => ({
      ...patient,
      firstName: newFirstName.trim(),
    }));
  }

  return (
    <main className="app">
      <h1>BuziaHub</h1>

      <section className="app-content">
        <PatientSelector
          patients={patients}
          selectedPatientId={selectedPatientId}
          onSelectPatient={handleSelectPatient}
        />

        {selectedPatient ? (
          <PatientProfile
            key={selectedPatient.id}
            patient={selectedPatient}
            onUpdateDetails={handleUpdateDetails}
            onEditFirstName={editPatientFirstName}
            onArchive={handleActivePatient}
          />
        ) : (
          <p>
            Select a patient to view their profile and
            appointments.
          </p>
        )}
      </section>
    </main>
  );
}