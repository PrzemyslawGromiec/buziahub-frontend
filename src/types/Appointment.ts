export type Appointment = {
    id: number,
    patientName: string,
    date: string,
    time: string,
    status: "SCHEDULED" | "COMPLETED" | "CANCELLED";
}