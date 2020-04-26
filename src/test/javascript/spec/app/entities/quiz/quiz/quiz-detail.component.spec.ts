import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Eo2GatewayTestModule } from '../../../../test.module';
import { QuizDetailComponent } from 'app/entities/quiz/quiz/quiz-detail.component';
import { Quiz } from 'app/shared/model/quiz/quiz.model';

describe('Component Tests', () => {
  describe('Quiz Management Detail Component', () => {
    let comp: QuizDetailComponent;
    let fixture: ComponentFixture<QuizDetailComponent>;
    const route = ({ data: of({ quiz: new Quiz(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Eo2GatewayTestModule],
        declarations: [QuizDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(QuizDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(QuizDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load quiz on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.quiz).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
