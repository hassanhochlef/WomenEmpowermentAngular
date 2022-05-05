import {User} from './user.model';
import { Media } from './media.model';
import {EventcommentModel} from './eventcomment.model';
import {EventFile} from './eventFile';

export class Event {
    eventId?: number;
    eventName?: string;
    description?: string;
    address?: string;
    bigDescription?: string;
    startAt?: string;
    endAt?: string;
    TargetDonation?: number;
    createurEvent?: User;
    lang?: string;
    latitude?: string;
    medias?: Media[];
    eventcomment?: EventcommentModel[];
    montantCollecte?: number;
    qrcode?: string;
    files?: EventFile[];

}

