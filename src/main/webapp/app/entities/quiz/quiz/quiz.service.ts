import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, SearchWithPagination } from 'app/shared/util/request-util';
import { IQuiz } from 'app/shared/model/quiz/quiz.model';

type EntityResponseType = HttpResponse<IQuiz>;
type EntityArrayResponseType = HttpResponse<IQuiz[]>;

@Injectable({ providedIn: 'root' })
export class QuizService {
    public resourceUrl = SERVER_API_URL + 'services/quiz/api/quizzes';
    public resourceSearchUrl = SERVER_API_URL + 'services/quiz/api/_search/quizzes';

    constructor(protected http: HttpClient) {}

    create(quiz: IQuiz): Observable<EntityResponseType> {
        return this.http.post<IQuiz>(this.resourceUrl, quiz, { observe: 'response' });
    }

    update(quiz: IQuiz): Observable<EntityResponseType> {
        return this.http.put<IQuiz>(this.resourceUrl, quiz, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IQuiz>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IQuiz[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<{}>> {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IQuiz[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
