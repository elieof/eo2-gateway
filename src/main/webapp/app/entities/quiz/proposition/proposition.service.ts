import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, SearchWithPagination } from 'app/shared/util/request-util';
import { IProposition } from 'app/shared/model/quiz/proposition.model';

type EntityResponseType = HttpResponse<IProposition>;
type EntityArrayResponseType = HttpResponse<IProposition[]>;

@Injectable({ providedIn: 'root' })
export class PropositionService {
  public resourceUrl = SERVER_API_URL + 'services/quiz/api/propositions';
  public resourceSearchUrl = SERVER_API_URL + 'services/quiz/api/_search/propositions';

  constructor(protected http: HttpClient) {}

  create(proposition: IProposition): Observable<EntityResponseType> {
    return this.http.post<IProposition>(this.resourceUrl, proposition, { observe: 'response' });
  }

  update(proposition: IProposition): Observable<EntityResponseType> {
    return this.http.put<IProposition>(this.resourceUrl, proposition, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProposition>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProposition[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProposition[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
