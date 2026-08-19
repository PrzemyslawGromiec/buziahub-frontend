import type { Appointment } from "../../types/Appointment";
import Button from "../Button/Button";

type AppointmentCardProps = {
  appointment: Appointment;
  onComplete: (id: number) => void;
  onCancel: (id: number) => void;
  showActions?: boolean;
};

export default function AppointmentCard({
  appointment,
  onComplete,
  onCancel,
  showActions = false,
}: AppointmentCardProps) {
  const startTime = new Date(appointment.startTime);
  const endTime = new Date(appointment.endTime);

  const formattedDate = startTime.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const formattedStartTime = startTime.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const formattedEndTime = endTime.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <article className="appointment-card">
      <h3>{appointment.patientName}</h3>

      <p>Date: {formattedDate}</p>

      <p>
        Time: {formattedStartTime}–{formattedEndTime}
      </p>

      <p>Status: {appointment.status}</p>

      {showActions && appointment.status === "SCHEDULED" && (
        <div className="appointment-card__actions">
          <Button onClick={() => onComplete(appointment.id)}>
            Complete
          </Button>

          <Button onClick={() => onCancel(appointment.id)}>
            Cancel
          </Button>
        </div>
      )}
    </article>
  );
}