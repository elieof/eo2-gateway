import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IQResult } from 'app/shared/model/quiz/q-result.model';

@Component({
    selector: 'jhi-q-result-detail',
    templateUrl: './q-result-detail.component.html'
})
export class QResultDetailComponent implements OnInit {
    qResult: IQResult | null = null;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit(): void {
        this.activatedRoute.data.subscribe(({ qResult }) => (this.qResult = qResult));
    }

    previousState(): void {
        window.history.back();
    }
}
