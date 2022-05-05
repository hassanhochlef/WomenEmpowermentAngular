import {Penality} from "./penality.enum";
import {Certificate} from "./certificate.model";

export class SanctionLearnner {
    SanctionId!: number;
    penality: Penality;
    certificate: Certificate;
}
