import {job} from './job.enum';
import {User} from "./user.model";
import {Appointment} from "./appointment.model";

export class Service {

    serviceId: number;
    Job: job;
    startDate: string;
    endDate: string;
    user: User;
    appointment: Appointment[];
}