import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, Router, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { EMPTY, Observable, of } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IProposition, Proposition } from 'app/shared/model/quiz/proposition.model';
import { PropositionService } from './proposition.service';
import { PropositionComponent } from './proposition.component';
import { PropositionDetailComponent } from './proposition-detail.component';
import { PropositionUpdateComponent } from './proposition-update.component';

@Injectable({ providedIn: 'root' })
export class PropositionResolve implements Resolve<IProposition> {
  constructor(private service: PropositionService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProposition> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((proposition: HttpResponse<Proposition>) => {
          if (proposition.body) {
            return of(proposition.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Proposition());
  }
}

export const propositionRoute: Routes = [
  {
    path: '',
    component: PropositionComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'eo2GatewayApp.quizProposition.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PropositionDetailComponent,
    resolve: {
      proposition: PropositionResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'eo2GatewayApp.quizProposition.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PropositionUpdateComponent,
    resolve: {
      proposition: PropositionResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'eo2GatewayApp.quizProposition.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PropositionUpdateComponent,
    resolve: {
      proposition: PropositionResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'eo2GatewayApp.quizProposition.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
