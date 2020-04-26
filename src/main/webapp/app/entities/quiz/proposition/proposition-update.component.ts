import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IProposition, Proposition } from 'app/shared/model/quiz/proposition.model';
import { PropositionService } from './proposition.service';
import { IQuestion } from 'app/shared/model/quiz/question.model';
import { QuestionService } from 'app/entities/quiz/question/question.service';

@Component({
    selector: 'jhi-proposition-update',
    templateUrl: './proposition-update.component.html'
})
export class PropositionUpdateComponent implements OnInit {
    isSaving = false;
    questions: IQuestion[] = [];

    editForm = this.fb.group({
        id: [],
        statement: [null, [Validators.required, Validators.minLength(2)]],
        valid: [null, [Validators.required]],
        explanation: [],
        questionId: []
    });

    constructor(
        protected propositionService: PropositionService,
        protected questionService: QuestionService,
        protected activatedRoute: ActivatedRoute,
        private fb: FormBuilder
    ) {}

    ngOnInit(): void {
        this.activatedRoute.data.subscribe(({ proposition }) => {
            this.updateForm(proposition);

            this.questionService.query().subscribe((res: HttpResponse<IQuestion[]>) => (this.questions = res.body || []));
        });
    }

    updateForm(proposition: IProposition): void {
        this.editForm.patchValue({
            id: proposition.id,
            statement: proposition.statement,
            valid: proposition.valid,
            explanation: proposition.explanation,
            questionId: proposition.questionId
        });
    }

    previousState(): void {
        window.history.back();
    }

    save(): void {
        this.isSaving = true;
        const proposition = this.createFromForm();
        if (proposition.id !== undefined) {
            this.subscribeToSaveResponse(this.propositionService.update(proposition));
        } else {
            this.subscribeToSaveResponse(this.propositionService.create(proposition));
        }
    }

    trackById(index: number, item: IQuestion): any {
        return item.id;
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IProposition>>): void {
        result.subscribe(
            () => this.onSaveSuccess(),
            () => this.onSaveError()
        );
    }

    protected onSaveSuccess(): void {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError(): void {
        this.isSaving = false;
    }

    private createFromForm(): IProposition {
        return {
            ...new Proposition(),
            id: this.editForm.get(['id'])!.value,
            statement: this.editForm.get(['statement'])!.value,
            valid: this.editForm.get(['valid'])!.value,
            explanation: this.editForm.get(['explanation'])!.value,
            questionId: this.editForm.get(['questionId'])!.value
        };
    }
}
