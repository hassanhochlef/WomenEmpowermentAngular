import {User} from './user.model';
import {Event} from './event.model';

export class EventcommentModel{
    eventCommentId: string;
    commentBody: string;
    user?: User;
    eventt?: Event;

}
