import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, SearchWithPagination } from 'app/shared/util/request-util';
import { IQuestion } from 'app/shared/model/quiz/question.model';

type EntityResponseType = HttpResponse<IQuestion>;
type EntityArrayResponseType = HttpResponse<IQuestion[]>;

@Injectable({ providedIn: 'root' })
export class QuestionService {
    public resourceUrl = SERVER_API_URL + 'services/quiz/api/questions';
    public resourceSearchUrl = SERVER_API_URL + 'services/quiz/api/_search/questions';

    constructor(protected http: HttpClient) {}

    create(question: IQuestion): Observable<EntityResponseType> {
        return this.http.post<IQuestion>(this.resourceUrl, question, { observe: 'response' });
    }

    update(question: IQuestion): Observable<EntityResponseType> {
        return this.http.put<IQuestion>(this.resourceUrl, question, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IQuestion>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IQuestion[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<{}>> {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IQuestion[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
