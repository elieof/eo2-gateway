import { IQuestion } from 'app/shared/model/quiz/question.model';
import { IEntityAuditing } from "app/shared/model/auditing.model";

export interface IQuiz extends IEntityAuditing {
    id?: number;
    name?: string;
    description?: string;
    questions?: IQuestion[];
}

export class Quiz implements IQuiz {
    constructor(public id?: number,
                public name?: string,
                public description?: string,
                public questions?: IQuestion[],
                public createdBy?: string,
                public createdDate?: Date,
                public lastModifiedBy?: string,
                public lastModifiedDate?: Date,
    ) {}
}
