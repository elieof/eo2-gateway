import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, SearchWithPagination } from 'app/shared/util/request-util';
import { ITopic } from 'app/shared/model/quiz/topic.model';

type EntityResponseType = HttpResponse<ITopic>;
type EntityArrayResponseType = HttpResponse<ITopic[]>;

@Injectable({ providedIn: 'root' })
export class TopicService {
    public resourceUrl = SERVER_API_URL + 'services/eooquiz/api/topics';
    public resourceSearchUrl = SERVER_API_URL + 'services/eooquiz/api/_search/topics';

    constructor(protected http: HttpClient) {}

    create(topic: ITopic): Observable<EntityResponseType> {
        return this.http.post<ITopic>(this.resourceUrl, topic, { observe: 'response' });
    }

    update(topic: ITopic): Observable<EntityResponseType> {
        return this.http.put<ITopic>(this.resourceUrl, topic, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ITopic>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITopic[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<{}>> {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITopic[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
