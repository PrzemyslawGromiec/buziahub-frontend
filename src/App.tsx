import { useState } from "react";

import AppointmentCard from "./components/AppointmentCard/AppointmentCard";
import Button from "./components/Button/Button";
import IOSSwitch from "./components/IOSSwitch/IOSSwitch";
import PatientCard from "./components/PatientCard/PatientCard";
import PatientDetailsForm from "./components/PatientDetailsForm/PatientDetailsForm";

import type { Appointment } from "./types/Appointment";
import type { Patient } from "./types/Patient";

import { generateAppointments } from "./utils/generateAppointments";
import { generatePatients } from "./utils/generatePatients";

import "./App.css";

function App() {
  const [patients, setPatients] = useState<Patient[]>(
    () => generatePatients(6),
  );

  const [appointments, setAppointments] = useState<Appointment[]>(
    () => generateAppointments(15, patients),
  );

  const [selectedPatientId, setSelectedPatientId] = useState(
    () => patients[0]?.id ?? 0,
  );

  const [showDetails, setShowDetails] = useState(true);
  const [newDetails, setNewDetails] = useState("");

  const selectedPatient =
    patients.find((patient) => patient.id === selectedPatientId) ??
    null;

  const selectedPatientAppointments = appointments.filter(
    (appointment) =>
      appointment.patientId === selectedPatientId,
  );

  function updateAppointmentStatus(
    id: number,
    status: Appointment["status"],
  ) {
    setAppointments((previousAppointments) =>
      previousAppointments.map((appointment) =>
        appointment.id === id
          ? { ...appointment, status }
          : appointment,
      ),
    );
  }

  function handleCompleteAppointment(id: number) {
    updateAppointmentStatus(id, "COMPLETED");
  }

  function handleCancelAppointment(id: number) {
    updateAppointmentStatus(id, "CANCELLED");
  }

  function handleUpdateDetails() {
    setPatients((previousPatients) =>
      previousPatients.map((patient) =>
        patient.id === selectedPatientId
          ? {
              ...patient,
              details: newDetails.trim(),
            }
          : patient,
      ),
    );

    setNewDetails("");
  }

  function handleActivePatient() {
    setPatients((previousPatients) =>
      previousPatients.map((patient) =>
        patient.id === selectedPatientId
          ? {
              ...patient,
              active: !patient.active,
            }
          : patient,
      ),
    );
  }

  function editPatientFirstName(newFirstName: string) {
    setPatients((previousPatients) =>
      previousPatients.map((patient) =>
        patient.id === selectedPatientId
          ? {
              ...patient,
              firstName: newFirstName,
            }
          : patient,
      ),
    );
  }

  function handleChangePatient() {
    const currentPatientIndex = patients.findIndex(
      (patient) => patient.id === selectedPatientId,
    );

    const nextPatientIndex =
      (currentPatientIndex + 1) % patients.length;

    setSelectedPatientId(patients[nextPatientIndex].id);
    setNewDetails("");
  }

  return (
    <main>
      <h1>BuziaHub</h1>

      <section>
        <IOSSwitch
          checked={showDetails}
          onChange={setShowDetails}
          label="Show patient details"
        />

        <h2>Patient profile</h2>

        {selectedPatient ? (
          <>
            <PatientCard
              patient={selectedPatient}
              showDetails={showDetails}
              onEdit={editPatientFirstName}
              onArchive={handleActivePatient}
            />

            <PatientDetailsForm
              details={newDetails}
              onDetailsChange={setNewDetails}
              onSubmit={handleUpdateDetails}
            />

            <Button onClick={handleChangePatient}>
              Next patient
            </Button>

            <h2>Appointments</h2>

            {selectedPatientAppointments.length > 0 ? (
              selectedPatientAppointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  onComplete={handleCompleteAppointment}
                  onCancel={handleCancelAppointment}
                  showActions
                />
              ))
            ) : (
              <p>This patient has no appointments.</p>
            )}
          </>
        ) : (
          <p>No patient selected.</p>
        )}
      </section>
    </main>
  );
}

export default App;