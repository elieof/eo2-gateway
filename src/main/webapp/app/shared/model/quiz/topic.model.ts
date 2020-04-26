import { IEntityAuditing } from "app/shared/model/auditing.model";

export interface ITopic extends IEntityAuditing {
  id?: number;
  name?: string;
}

export class Topic implements ITopic {
  constructor(public id?: number,
              public name?: string,
              public createdBy?: string,
              public createdDate?: Date,
              public lastModifiedBy?: string,
              public lastModifiedDate?: Date,
  ) {}
}
