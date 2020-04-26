export interface IQResult {
    id?: number;
    username?: string;
    valid?: boolean;
    questionId?: number;
}

export class QResult implements IQResult {
    constructor(public id?: number, public username?: string, public valid?: boolean, public questionId?: number) {
        this.valid = this.valid || false;
    }
}
