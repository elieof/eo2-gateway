import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, Router, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { EMPTY, Observable, of } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IQuestion, Question } from 'app/shared/model/quiz/question.model';
import { QuestionService } from './question.service';
import { QuestionComponent } from './question.component';
import { QuestionDetailComponent } from './question-detail.component';
import { QuestionUpdateComponent } from './question-update.component';

@Injectable({ providedIn: 'root' })
export class QuestionResolve implements Resolve<IQuestion> {
  constructor(private service: QuestionService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IQuestion> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((question: HttpResponse<Question>) => {
          if (question.body) {
            return of(question.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Question());
  }
}

export const questionRoute: Routes = [
  {
    path: '',
    component: QuestionComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'eo2GatewayApp.quizQuestion.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: QuestionDetailComponent,
    resolve: {
      question: QuestionResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'eo2GatewayApp.quizQuestion.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: QuestionUpdateComponent,
    resolve: {
      question: QuestionResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'eo2GatewayApp.quizQuestion.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: QuestionUpdateComponent,
    resolve: {
      question: QuestionResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'eo2GatewayApp.quizQuestion.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
