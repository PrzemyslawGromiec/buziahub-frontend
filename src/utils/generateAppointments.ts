import type { Appointment } from "../types/Appointment";
import type { Patient } from "../types/Patient";

const appointmentHours = [
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
];

const statuses: Appointment["status"][] = [
  "SCHEDULED",
  "CANCELLED",
  "COMPLETED",
];

export function generateAppointments(
  count: number,
  patients: Patient[],
): Appointment[] {
  if (patients.length === 0) {
    return [];
  }

  const appointments: Appointment[] = [];

  for (let index = 0; index < count; index++) {
    const patientIndex = Math.floor(
      Math.random() * patients.length,
    );

    const patient = patients[patientIndex];

    const randomDays = Math.floor(Math.random() * 30);
    const randomHourIndex = Math.floor(
      Math.random() * appointmentHours.length,
    );

    const appointmentHour =
      appointmentHours[randomHourIndex];

    const startTime = new Date();

    startTime.setDate(startTime.getDate() + randomDays);
    startTime.setHours(appointmentHour, 0, 0, 0);

    const endTime = new Date(startTime);
    endTime.setHours(endTime.getHours() + 1);

    const randomStatusIndex = Math.floor(
      Math.random() * statuses.length,
    );

    const appointment: Appointment = {
      id: index + 1,
      patientId: patient.id,
      patientName: `${patient.firstName} ${patient.lastName}`,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      status: statuses[randomStatusIndex],
    };

    appointments.push(appointment);
  }

  return appointments;
}