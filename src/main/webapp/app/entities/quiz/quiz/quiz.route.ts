import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, Router, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { EMPTY, Observable, of } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IQuiz, Quiz } from 'app/shared/model/quiz/quiz.model';
import { QuizService } from './quiz.service';
import { QuizComponent } from './quiz.component';
import { QuizDetailComponent } from './quiz-detail.component';
import { QuizUpdateComponent } from './quiz-update.component';

@Injectable({ providedIn: 'root' })
export class QuizResolve implements Resolve<IQuiz> {
    constructor(private service: QuizService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot): Observable<IQuiz> | Observable<never> {
        const id = route.params['id'];
        if (id) {
            return this.service.find(id).pipe(
                flatMap((quiz: HttpResponse<Quiz>) => {
                    if (quiz.body) {
                        return of(quiz.body);
                    } else {
                        this.router.navigate(['404']);
                        return EMPTY;
                    }
                })
            );
        }
        return of(new Quiz());
    }
}

export const quizRoute: Routes = [
    {
        path: '',
        component: QuizComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: [Authority.USER],
            defaultSort: 'id,asc',
            pageTitle: 'eo2GatewayApp.quizQuiz.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: QuizDetailComponent,
        resolve: {
            quiz: QuizResolve
        },
        data: {
            authorities: [Authority.USER],
            pageTitle: 'eo2GatewayApp.quizQuiz.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: QuizUpdateComponent,
        resolve: {
            quiz: QuizResolve
        },
        data: {
            authorities: [Authority.USER],
            pageTitle: 'eo2GatewayApp.quizQuiz.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: QuizUpdateComponent,
        resolve: {
            quiz: QuizResolve
        },
        data: {
            authorities: [Authority.USER],
            pageTitle: 'eo2GatewayApp.quizQuiz.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];