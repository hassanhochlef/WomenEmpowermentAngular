import {Answer} from './Answer.model';

export class QuizQuestion {
    questionId: number;
    score: number;
    question: string;
    answers: Answer[];
}
