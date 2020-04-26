import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IQuestion, Question } from 'app/shared/model/quiz/question.model';
import { QuestionService } from './question.service';
import { ITopic } from 'app/shared/model/quiz/topic.model';
import { TopicService } from 'app/entities/quiz/topic/topic.service';
import { IQuiz } from 'app/shared/model/quiz/quiz.model';
import { QuizService } from 'app/entities/quiz/quiz/quiz.service';

type SelectableEntity = ITopic | IQuiz;

@Component({
    selector: 'jhi-question-update',
    templateUrl: './question-update.component.html'
})
export class QuestionUpdateComponent implements OnInit {
    isSaving = false;
    topics: ITopic[] = [];
    quizzes: IQuiz[] = [];

    editForm = this.fb.group({
        id: [],
        statement: [null, [Validators.required, Validators.minLength(3)]],
        level: [null, [Validators.required]],
        topicId: [],
        quizId: []
    });

    constructor(
        protected questionService: QuestionService,
        protected topicService: TopicService,
        protected quizService: QuizService,
        protected activatedRoute: ActivatedRoute,
        private fb: FormBuilder
    ) {}

    ngOnInit(): void {
        this.activatedRoute.data.subscribe(({ question }) => {
            this.updateForm(question);

            this.topicService.query().subscribe((res: HttpResponse<ITopic[]>) => (this.topics = res.body || []));

            this.quizService.query().subscribe((res: HttpResponse<IQuiz[]>) => (this.quizzes = res.body || []));
        });
    }

    updateForm(question: IQuestion): void {
        this.editForm.patchValue({
            id: question.id,
            statement: question.statement,
            level: question.level,
            topicId: question.topicId,
            quizId: question.quizId
        });
    }

    previousState(): void {
        window.history.back();
    }

    save(): void {
        this.isSaving = true;
        const question = this.createFromForm();
        if (question.id !== undefined) {
            this.subscribeToSaveResponse(this.questionService.update(question));
        } else {
            this.subscribeToSaveResponse(this.questionService.create(question));
        }
    }

    trackById(index: number, item: SelectableEntity): any {
        return item.id;
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IQuestion>>): void {
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

    private createFromForm(): IQuestion {
        return {
            ...new Question(),
            id: this.editForm.get(['id'])!.value,
            statement: this.editForm.get(['statement'])!.value,
            level: this.editForm.get(['level'])!.value,
            topicId: this.editForm.get(['topicId'])!.value,
            quizId: this.editForm.get(['quizId'])!.value
        };
    }
}
