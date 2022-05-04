import {CreatedCourses} from './created-courses.model';

export class Subscription{
    subscriptionId!: number;
    subscriptionDate!: Date;
    expiresAt!: Date;
    price!: number;
}
