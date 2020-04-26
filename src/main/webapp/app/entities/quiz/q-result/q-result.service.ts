import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, SearchWithPagination } from 'app/shared/util/request-util';
import { IQResult } from 'app/shared/model/quiz/q-result.model';

type EntityResponseType = HttpResponse<IQResult>;
type EntityArrayResponseType = HttpResponse<IQResult[]>;

@Injectable({ providedIn: 'root' })
export class QResultService {
    public resourceUrl = SERVER_API_URL + 'services/quiz/api/q-results';
    public resourceSearchUrl = SERVER_API_URL + 'services/quiz/api/_search/q-results';

    constructor(protected http: HttpClient) {}

    create(qResult: IQResult): Observable<EntityResponseType> {
        return this.http.post<IQResult>(this.resourceUrl, qResult, { observe: 'response' });
    }

    update(qResult: IQResult): Observable<EntityResponseType> {
        return this.http.put<IQResult>(this.resourceUrl, qResult, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IQResult>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IQResult[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<{}>> {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IQResult[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
