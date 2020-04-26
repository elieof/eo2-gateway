import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { Eo2GatewayTestModule } from '../../../../test.module';
import { PropositionUpdateComponent } from 'app/entities/quiz/proposition/proposition-update.component';
import { PropositionService } from 'app/entities/quiz/proposition/proposition.service';
import { Proposition } from 'app/shared/model/quiz/proposition.model';

describe('Component Tests', () => {
  describe('Proposition Management Update Component', () => {
    let comp: PropositionUpdateComponent;
    let fixture: ComponentFixture<PropositionUpdateComponent>;
    let service: PropositionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Eo2GatewayTestModule],
        declarations: [PropositionUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PropositionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PropositionUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PropositionService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Proposition(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Proposition();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
