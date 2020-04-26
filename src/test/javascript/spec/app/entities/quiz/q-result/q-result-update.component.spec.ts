import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { Eo2GatewayTestModule } from '../../../../test.module';
import { QResultUpdateComponent } from 'app/entities/quiz/q-result/q-result-update.component';
import { QResultService } from 'app/entities/quiz/q-result/q-result.service';
import { QResult } from 'app/shared/model/quiz/q-result.model';

describe('Component Tests', () => {
  describe('QResult Management Update Component', () => {
    let comp: QResultUpdateComponent;
    let fixture: ComponentFixture<QResultUpdateComponent>;
    let service: QResultService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Eo2GatewayTestModule],
        declarations: [QResultUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(QResultUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(QResultUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(QResultService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new QResult(123);
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
        const entity = new QResult();
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
