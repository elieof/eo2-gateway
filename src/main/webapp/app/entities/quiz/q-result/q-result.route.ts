import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, Router, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { EMPTY, Observable, of } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IQResult, QResult } from 'app/shared/model/quiz/q-result.model';
import { QResultService } from './q-result.service';
import { QResultComponent } from './q-result.component';
import { QResultDetailComponent } from './q-result-detail.component';
import { QResultUpdateComponent } from './q-result-update.component';

@Injectable({ providedIn: 'root' })
export class QResultResolve implements Resolve<IQResult> {
    constructor(private service: QResultService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot): Observable<IQResult> | Observable<never> {
        const id = route.params['id'];
        if (id) {
            return this.service.find(id).pipe(
                flatMap((qResult: HttpResponse<QResult>) => {
                    if (qResult.body) {
                        return of(qResult.body);
                    } else {
                        this.router.navigate(['404']);
                        return EMPTY;
                    }
                })
            );
        }
        return of(new QResult());
    }
}

export const qResultRoute: Routes = [
    {
        path: '',
        component: QResultComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: [Authority.USER],
            defaultSort: 'id,asc',
            pageTitle: 'eo2GatewayApp.quizQResult.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: QResultDetailComponent,
        resolve: {
            qResult: QResultResolve
        },
        data: {
            authorities: [Authority.USER],
            pageTitle: 'eo2GatewayApp.quizQResult.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: QResultUpdateComponent,
        resolve: {
            qResult: QResultResolve
        },
        data: {
            authorities: [Authority.USER],
            pageTitle: 'eo2GatewayApp.quizQResult.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: QResultUpdateComponent,
        resolve: {
            qResult: QResultResolve
        },
        data: {
            authorities: [Authority.USER],
            pageTitle: 'eo2GatewayApp.quizQResult.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
