import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProposition } from 'app/shared/model/quiz/proposition.model';

@Component({
    selector: 'jhi-proposition-detail',
    templateUrl: './proposition-detail.component.html'
})
export class PropositionDetailComponent implements OnInit {
    proposition: IProposition | null = null;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit(): void {
        this.activatedRoute.data.subscribe(({ proposition }) => (this.proposition = proposition));
    }

    previousState(): void {
        window.history.back();
    }
}
