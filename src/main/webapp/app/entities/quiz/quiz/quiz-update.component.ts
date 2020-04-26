import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IQuiz, Quiz } from 'app/shared/model/quiz/quiz.model';
import { QuizService } from './quiz.service';

@Component({
    selector: 'jhi-quiz-update',
    templateUrl: './quiz-update.component.html'
})
export class QuizUpdateComponent implements OnInit {
    isSaving = false;

    editForm = this.fb.group({
        id: [],
        name: [null, [Validators.required, Validators.minLength(2)]],
        description: []
    });

    constructor(protected quizService: QuizService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

    ngOnInit(): void {
        this.activatedRoute.data.subscribe(({ quiz }) => {
            this.updateForm(quiz);
        });
    }

    updateForm(quiz: IQuiz): void {
        this.editForm.patchValue({
            id: quiz.id,
            name: quiz.name,
            description: quiz.description
        });
    }

    previousState(): void {
        window.history.back();
    }

    save(): void {
        this.isSaving = true;
        const quiz = this.createFromForm();
        if (quiz.id !== undefined) {
            this.subscribeToSaveResponse(this.quizService.update(quiz));
        } else {
            this.subscribeToSaveResponse(this.quizService.create(quiz));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IQuiz>>): void {
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

    private createFromForm(): IQuiz {
        return {
            ...new Quiz(),
            id: this.editForm.get(['id'])!.value,
            name: this.editForm.get(['name'])!.value,
            description: this.editForm.get(['description'])!.value
        };
    }
}
