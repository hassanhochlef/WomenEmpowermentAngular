import {Domain} from './domain.enum';
import {Certificate} from './certificate.model';
import {User} from './user.model';
import {Offre} from './offre';
import {Interview} from './Interview.model';
import {CndidacyState} from './CndidacyState.enum';

export class Candidacy {
     candidacyId: number;

     isBookmarked: boolean;

    candidacyState!: CndidacyState ;

    candidate: User ;

    offer: Offre;

    interview: Interview;

}
