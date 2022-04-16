import {User} from "./user.model";

export class Certificate {
    aquired: boolean;
    certificateId: number;
    certificateQR: string;
    obtainingDate: string;
    sanctions: [];
    user: User;
}
