import {QuizQuestion} from './QuizQuestion.model';

export class Quiz {
    quizId: number;
    theme: string;
    questions: QuizQuestion[];
}
