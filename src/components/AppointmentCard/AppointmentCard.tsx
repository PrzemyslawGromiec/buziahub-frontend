import Button from "../Button/Button";
import { Appointment } from "../../types/Appointment";

type AppointmentCardProps = {
    appointment: Appointment;
    onComplete: (id: number) => void;
    onCancel: (id: number) => void;
    showActions?: boolean;
}

export default function AppointmentCard({
    appointment,
    onComplete,
    onCancel,
    showActions

} : AppointmentCardProps) {

    return (
        <div>
            <h3>{appointment.patientName}</h3>
            <p>{appointment.date}</p>
            <p>{appointment.time}</p>
            <p>{appointment.status}</p>
            {showActions && appointment.status === "SCHEDULED" && (
                <div>
                    <Button onClick={() => onComplete(appointment.id)}>
                        Complete
                    </Button>
                    <Button onClick={() => onCancel(appointment.id)} >
                        Cancel
                    </Button>
                </div>
            )}
        </div>
    )
    

}