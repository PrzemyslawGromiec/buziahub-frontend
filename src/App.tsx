import { useState } from "react";
import PatientCard from "./components/PatientCard/PatientCard";
import Button from "./components/Button/Button";
import IOSSwitch from "./components/IOSSwitch/IOSSwitch";
import PatientDetailsForm from "./components/PatientDetailsForm/PatientDetailsForm";
import type { Appointment } from "./types/Appointment";
import { generateAppointments } from "./utils/generateAppointments";

import "./App.css";
import AppointmentCard from "./components/AppointmentCard/AppointmentCard";

function App() {
  const [patient, setPatient] = useState({
    firstName: "John",
    lastName: "Snow",
    age: 30,
    details: "Patient details here",
    active: true,
  });

  const [appointments, setAppointments] = useState<Appointment[]>(
    generateAppointments(5),
  );

  function handleCompleteAppointment(id: number) {
    setAppointments((prevAppointments) => {
      return prevAppointments.map((appointment) => {
        if (appointment.id !== id) {
          return appointment;
        }
        return {
          ...appointment,
          status: "COMPLETED",
        };
      });
    });
  }

  function handleCancelAppointment(id: number) {
    setAppointment((prevAppointment) => {
      if (prevAppointment.id !== id) {
        return prevAppointment;
      }

      return {
        ...prevAppointment,
        status: "CANCELLED",
      };
    });
  }

  const [showDetails, setShowDetails] = useState(true);
  const [newDetails, setNewDetails] = useState("");

  function handleChangePatient() {
    setPatient({
      firstName: "Jane",
      lastName: "Smith",
      age: 25,
      details: "New patient details here",
      active: true,
    });
  }

  function handleUpdateDetails() {
    setPatient((prevPatient) => ({
      ...prevPatient,
      details: newDetails,
    }));
    setNewDetails("");
  }

  function handleActivePatient() {
    setPatient((prevPatient) => ({
      ...prevPatient,
      active: !prevPatient.active,
    }));
  }

  function editPatientFirstName(newFirstName: string) {
  setPatient((prevPatient) => ({
    ...prevPatient,
    firstName: newFirstName,
  }));
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
        <PatientCard
          patient={patient}
          showDetails={showDetails}
          onEdit={editPatientFirstName}
          onArchive={handleActivePatient}
        />

        <PatientDetailsForm
          details={newDetails}
          onDetailsChange={setNewDetails}
          onSubmit={handleUpdateDetails}
        />
        <Button onClick={handleChangePatient}>Change patient</Button>

        {appointments.map((appointment) => (
          <AppointmentCard
            key={appointment.id}
            appointment={appointment}
            onComplete={handleCompleteAppointment}
            onCancel={handleCancelAppointment}
            showActions
          />
        ))}
      </section>
    </main>
  );
}

export default App;
