import {PostMedia} from "./PostMedia.model";

export class Advertising {
    advertisingId: number ;

    maxage: string;
    isTreated: string;
    nbrFinalViews: string ;
    nbrIntialViews: string ;
    price: string;
    startDate: string;
    endDate: string ;
    text: string;
    name: string;
    medias: PostMedia[];

}
