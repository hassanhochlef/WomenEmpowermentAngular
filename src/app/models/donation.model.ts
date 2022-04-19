import {Representative} from "../demo/domain/customer";
import {User} from './user.model';
import {Event} from "./event.model";

export class Donation{
    donationId: number;
    donationDate: string;
    codePayement: string;
    qrcode: string;
    donor?: User;
    event?: Event;


}
