export type Appointment = {
  id: number;
  patientId: number;
  patientName: string;
  startTime: string;
  endTime: string;
  status: AppointmentStatus;
};

export type AppointmentStatus = "SCHEDULED" | "COMPLETED" | "CANCELLED";