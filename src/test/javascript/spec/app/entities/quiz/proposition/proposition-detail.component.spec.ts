import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Eo2GatewayTestModule } from '../../../../test.module';
import { PropositionDetailComponent } from 'app/entities/quiz/proposition/proposition-detail.component';
import { Proposition } from 'app/shared/model/quiz/proposition.model';

describe('Component Tests', () => {
  describe('Proposition Management Detail Component', () => {
    let comp: PropositionDetailComponent;
    let fixture: ComponentFixture<PropositionDetailComponent>;
    const route = ({ data: of({ proposition: new Proposition(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Eo2GatewayTestModule],
        declarations: [PropositionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PropositionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PropositionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load proposition on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.proposition).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
