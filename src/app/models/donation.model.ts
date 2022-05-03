import {User} from './user.model';
import {Event} from './event.model';

export class Donation{
    donationId: number;
    donationDate: string;
    codePayement: string;
    amountForEvent: number;
    donor?: User;
    event?: Event;


}
