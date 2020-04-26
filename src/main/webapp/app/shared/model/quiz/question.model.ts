import { IProposition } from 'app/shared/model/quiz/proposition.model';

export interface IQuestion {
    id?: number;
    statement?: string;
    level?: number;
    propositions?: IProposition[];
    topicId?: number;
    quizId?: number;
}

export class Question implements IQuestion {
    constructor(
        public id?: number,
        public statement?: string,
        public level?: number,
        public propositions?: IProposition[],
        public topicId?: number,
        public quizId?: number
    ) {}
}
