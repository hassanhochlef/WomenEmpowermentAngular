import {User} from './user.model';
import { Media } from './media.model';
import {EventcommentModel} from './eventcomment.model';

export class Event {
    eventId?: number;
    eventName?: string;
    description?: string;
    address?: string;
    createdAt?: string;
    startAt?: string;
    endAt?: string;
    eventType?: string;
    maxPlace?: number;
    createurEvent?: User;
    lang?: string;
    latitude?: string;
    image?: string;
    medias?: Media[];
    eventcomment?: EventcommentModel[];

}

