export interface IProposition {
    id?: number;
    statement?: string;
    valid?: boolean;
    explanation?: string;
    questionId?: number;
}

export class Proposition implements IProposition {
    constructor(
        public id?: number,
        public statement?: string,
        public valid?: boolean,
        public explanation?: string,
        public questionId?: number
    ) {
        this.valid = this.valid || false;
    }
}
