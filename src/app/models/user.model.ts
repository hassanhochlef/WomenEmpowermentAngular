import {Role} from "./role.enum";
import {Course} from "./course.model";
import {CreatedCourses} from "./created-courses.model";
import {Media} from './media.model';





export class User {
    userId!: number;
    username!: string;
    password: string = "";
    name: string = "";
    role!: Role;
    phoneNumber!: string;
    email!: string;
    country!: string;
    address!: string;
    birthDate!: Date;
    loginAttempts: number = 0;
    locked: boolean = false;
    accessToken!: string;
    refreshToken!: string;
    establishmentDate!: Date;
    nbCasesSolved!: number;
    nbEventsCreated!: number;
    activityDomain!: string;
    profilPic!: string;
    createdCourses!: CreatedCourses;

}
