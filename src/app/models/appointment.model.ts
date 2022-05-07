import {User} from "./user.model";
import {Service} from "./service.model";

export class Appointment {
    appointmentId: number;
    appointmentDate: string;
    caseSolved: boolean;
    Expert: User;
    service: Service;
    user: User;
}