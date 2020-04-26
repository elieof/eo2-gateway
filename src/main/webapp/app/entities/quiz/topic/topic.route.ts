import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, Router, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { EMPTY, Observable, of } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITopic, Topic } from 'app/shared/model/quiz/topic.model';
import { TopicService } from './topic.service';
import { TopicComponent } from './topic.component';
import { TopicDetailComponent } from './topic-detail.component';
import { TopicUpdateComponent } from './topic-update.component';

@Injectable({ providedIn: 'root' })
export class TopicResolve implements Resolve<ITopic> {
    constructor(private service: TopicService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot): Observable<ITopic> | Observable<never> {
        const id = route.params['id'];
        if (id) {
            return this.service.find(id).pipe(
                flatMap((topic: HttpResponse<Topic>) => {
                    if (topic.body) {
                        return of(topic.body);
                    } else {
                        this.router.navigate(['404']);
                        return EMPTY;
                    }
                })
            );
        }
        return of(new Topic());
    }
}

export const topicRoute: Routes = [
    {
        path: '',
        component: TopicComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: [Authority.USER],
            defaultSort: 'id,asc',
            pageTitle: 'eo2GatewayApp.quizTopic.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: TopicDetailComponent,
        resolve: {
            topic: TopicResolve
        },
        data: {
            authorities: [Authority.USER],
            pageTitle: 'eo2GatewayApp.quizTopic.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: TopicUpdateComponent,
        resolve: {
            topic: TopicResolve
        },
        data: {
            authorities: [Authority.USER],
            pageTitle: 'eo2GatewayApp.quizTopic.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: TopicUpdateComponent,
        resolve: {
            topic: TopicResolve
        },
        data: {
            authorities: [Authority.USER],
            pageTitle: 'eo2GatewayApp.quizTopic.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
