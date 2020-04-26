import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Eo2GatewaySharedModule } from 'app/shared/shared.module';
import { QResultComponent } from './q-result.component';
import { QResultDetailComponent } from './q-result-detail.component';
import { QResultUpdateComponent } from './q-result-update.component';
import { QResultDeleteDialogComponent } from './q-result-delete-dialog.component';
import { qResultRoute } from './q-result.route';

@NgModule({
    imports: [Eo2GatewaySharedModule, RouterModule.forChild(qResultRoute)],
    declarations: [QResultComponent, QResultDetailComponent, QResultUpdateComponent, QResultDeleteDialogComponent],
    entryComponents: [QResultDeleteDialogComponent]
})
export class QuizQResultModule {
}
