import {User} from './user.model';

export class Complaint {
     complaintId: number ;

    complaintTitle: string ;
    createdAt: string;
    isTreated: string;
    content: string ;
    user: User;


}
