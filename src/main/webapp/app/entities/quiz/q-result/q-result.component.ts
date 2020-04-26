import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IQResult } from 'app/shared/model/quiz/q-result.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { QResultService } from './q-result.service';
import { QResultDeleteDialogComponent } from './q-result-delete-dialog.component';

@Component({
    selector: 'jhi-q-result',
    templateUrl: './q-result.component.html'
})
export class QResultComponent implements OnInit, OnDestroy {
    qResults?: IQResult[];
    eventSubscriber?: Subscription;
    currentSearch: string;
    totalItems = 0;
    itemsPerPage = ITEMS_PER_PAGE;
    page!: number;
    predicate!: string;
    ascending!: boolean;
    ngbPaginationPage = 1;

    constructor(
        protected qResultService: QResultService,
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
        protected eventManager: JhiEventManager,
        protected modalService: NgbModal
    ) {
        this.currentSearch =
            this.activatedRoute.snapshot && this.activatedRoute.snapshot.queryParams['search']
                ? this.activatedRoute.snapshot.queryParams['search']
                : '';
    }

    loadPage(page?: number): void {
        const pageToLoad: number = page || this.page;

        if (this.currentSearch) {
            this.qResultService
                .search({
                    page: pageToLoad - 1,
                    query: this.currentSearch,
                    size: this.itemsPerPage,
                    sort: this.sort()
                })
                .subscribe(
                    (res: HttpResponse<IQResult[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
                    () => this.onError()
                );
            return;
        }

        this.qResultService
            .query({
                page: pageToLoad - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IQResult[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
                () => this.onError()
            );
    }

    search(query: string): void {
        this.currentSearch = query;
        this.loadPage(1);
    }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe(data => {
            this.page = data.pagingParams.page;
            this.ascending = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
            this.ngbPaginationPage = data.pagingParams.page;
            this.loadPage();
        });
        this.registerChangeInQResults();
    }

    ngOnDestroy(): void {
        if (this.eventSubscriber) {
            this.eventManager.destroy(this.eventSubscriber);
        }
    }

    trackId(index: number, item: IQResult): number {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        return item.id!;
    }

    registerChangeInQResults(): void {
        this.eventSubscriber = this.eventManager.subscribe('qResultListModification', () => this.loadPage());
    }

    delete(qResult: IQResult): void {
        const modalRef = this.modalService.open(QResultDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.qResult = qResult;
    }

    sort(): string[] {
        const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    protected onSuccess(data: IQResult[] | null, headers: HttpHeaders, page: number): void {
        this.totalItems = Number(headers.get('X-Total-Count'));
        this.page = page;
        this.ngbPaginationPage = this.page;
        this.router.navigate(['/q-result'], {
            queryParams: {
                page: this.page,
                size: this.itemsPerPage,
                search: this.currentSearch,
                sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc')
            }
        });
        this.qResults = data || [];
    }

    protected onError(): void {
        this.ngbPaginationPage = this.page;
    }
}
