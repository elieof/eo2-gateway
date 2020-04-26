import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Eo2GatewaySharedModule } from 'app/shared/shared.module';
import { PropositionComponent } from './proposition.component';
import { PropositionDetailComponent } from './proposition-detail.component';
import { PropositionUpdateComponent } from './proposition-update.component';
import { PropositionDeleteDialogComponent } from './proposition-delete-dialog.component';
import { propositionRoute } from './proposition.route';

@NgModule({
  imports: [Eo2GatewaySharedModule, RouterModule.forChild(propositionRoute)],
  declarations: [PropositionComponent, PropositionDetailComponent, PropositionUpdateComponent, PropositionDeleteDialogComponent],
  entryComponents: [PropositionDeleteDialogComponent]
})
export class QuizPropositionModule {
}
