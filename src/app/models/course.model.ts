import {Certificate} from './certificate.model';
import {Domain} from './domain.enum';
import {User} from './user.model';
import {cFile} from './file.model';

export class Course {
    courseId: number;
    channelId: string;
    courseName: string;
    domain: Domain ;
    startDate: Date;
    endDate: Date;
    onGoing: boolean;
    calendarId: string;
    nbHours: number;
    certificates: Certificate;
    files: cFile[];
    buser: User[];
    streamKey: string;

}

