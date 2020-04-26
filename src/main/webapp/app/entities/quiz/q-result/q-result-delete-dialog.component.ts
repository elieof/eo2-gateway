import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IQResult } from 'app/shared/model/quiz/q-result.model';
import { QResultService } from './q-result.service';

@Component({
    templateUrl: './q-result-delete-dialog.component.html'
})
export class QResultDeleteDialogComponent {
    qResult?: IQResult;

    constructor(protected qResultService: QResultService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    cancel(): void {
        this.activeModal.dismiss();
    }

    confirmDelete(id: number): void {
        this.qResultService.delete(id).subscribe(() => {
            this.eventManager.broadcast('qResultListModification');
            this.activeModal.close();
        });
    }
}
