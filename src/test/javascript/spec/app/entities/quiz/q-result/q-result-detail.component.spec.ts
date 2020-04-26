import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Eo2GatewayTestModule } from '../../../../test.module';
import { QResultDetailComponent } from 'app/entities/quiz/q-result/q-result-detail.component';
import { QResult } from 'app/shared/model/quiz/q-result.model';

describe('Component Tests', () => {
  describe('QResult Management Detail Component', () => {
    let comp: QResultDetailComponent;
    let fixture: ComponentFixture<QResultDetailComponent>;
    const route = ({ data: of({ qResult: new QResult(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Eo2GatewayTestModule],
        declarations: [QResultDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(QResultDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(QResultDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load qResult on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.qResult).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
