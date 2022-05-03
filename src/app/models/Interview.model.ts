import {InterviewState} from './InterviewState.enum';
import {Candidacy} from './Candidacy.model';

export class Interview {

     idInterview: number;

     interviewDate: Date;

    interviewState!: InterviewState;
     candidacy: Candidacy;
}

