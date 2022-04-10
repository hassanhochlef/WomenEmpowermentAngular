export interface Course {
    courseId: number;
    channelId: string;
    courseName: string;
    domain: string;
    startDate: string;
    endDate: string;
    onGoing: boolean;
    calendarId: string;
    nbHours: number;
    certificates: [];
    files: [];
    streamKey: string;

}
