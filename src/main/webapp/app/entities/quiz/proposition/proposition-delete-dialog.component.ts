import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProposition } from 'app/shared/model/quiz/proposition.model';
import { PropositionService } from './proposition.service';

@Component({
  templateUrl: './proposition-delete-dialog.component.html'
})
export class PropositionDeleteDialogComponent {
  proposition?: IProposition;

  constructor(
    protected propositionService: PropositionService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.propositionService.delete(id).subscribe(() => {
      this.eventManager.broadcast('propositionListModification');
      this.activeModal.close();
    });
  }
}
