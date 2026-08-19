import type { Appointment } from "../types/Appointment";

const firstNames = [
  "John",
  "Anna",
  "Michael",
  "Sarah",
  "David",
  "Emma",
];

const lastNames = [
   "Smith",
  "Brown",
  "Wilson",
  "Taylor",
  "Jones",
  "Williams",
];

const times = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
]

const status: Appointment["status"][] = [
    "SCHEDULED",
    "CANCELLED",
    "COMPLETED"
]

export function generateAppointments(
    count: number,
): Appointment[] {

    const appointments: Appointment[] = [];
    for (let i = 0; i < count; i++) {
        const firstnameIndex = Math.floor(Math.random() * firstNames.length);
        const lastNameIndex = Math.floor(Math.random() * lastNames.length);
        const patientName = `${firstNames[firstnameIndex]} ${lastNames[lastNameIndex]}`;
        const randomDays = Math.floor(Math.random() * 30);
        const date = new Date();
        date.setDate(date.getDate() + randomDays);
        const appointmentDate = date.toISOString().split("T")[0];

        const randomTime = Math.floor(Math.random() * times.length);
        const appointmentTime = times[randomTime];

        const randomStatus = status[Math.floor(Math.random() * status.length)];
    
        const appointment: Appointment = {
            id: i + 1,
            patientName,
            date: appointmentDate,
            time: appointmentTime,
            status: randomStatus
        };

        appointments.push(appointment)

    }

    return appointments;
}