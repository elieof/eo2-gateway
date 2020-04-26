import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IQResult, QResult } from 'app/shared/model/quiz/q-result.model';
import { QResultService } from './q-result.service';
import { IQuestion } from 'app/shared/model/quiz/question.model';
import { QuestionService } from 'app/entities/quiz/question/question.service';

@Component({
    selector: 'jhi-q-result-update',
    templateUrl: './q-result-update.component.html'
})
export class QResultUpdateComponent implements OnInit {
    isSaving = false;
    questions: IQuestion[] = [];

    editForm = this.fb.group({
        id: [],
        username: [null, []],
        valid: [null, [Validators.required]],
        questionId: []
    });

    constructor(
        protected qResultService: QResultService,
        protected questionService: QuestionService,
        protected activatedRoute: ActivatedRoute,
        private fb: FormBuilder
    ) {}

    ngOnInit(): void {
        this.activatedRoute.data.subscribe(({ qResult }) => {
            this.updateForm(qResult);

            this.questionService.query().subscribe((res: HttpResponse<IQuestion[]>) => (this.questions = res.body || []));
        });
    }

    updateForm(qResult: IQResult): void {
        this.editForm.patchValue({
            id: qResult.id,
            username: qResult.username,
            valid: qResult.valid,
            questionId: qResult.questionId
        });
    }

    previousState(): void {
        window.history.back();
    }

    save(): void {
        this.isSaving = true;
        const qResult = this.createFromForm();
        if (qResult.id !== undefined) {
            this.subscribeToSaveResponse(this.qResultService.update(qResult));
        } else {
            this.subscribeToSaveResponse(this.qResultService.create(qResult));
        }
    }

    trackById(index: number, item: IQuestion): any {
        return item.id;
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IQResult>>): void {
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

    private createFromForm(): IQResult {
        return {
            ...new QResult(),
            id: this.editForm.get(['id'])!.value,
            username: this.editForm.get(['username'])!.value,
            valid: this.editForm.get(['valid'])!.value,
            questionId: this.editForm.get(['questionId'])!.value
        };
    }
}
