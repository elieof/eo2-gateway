import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Eo2GatewaySharedModule } from 'app/shared/shared.module';

import { TrackerComponent } from './tracker.component';

import { trackerRoute } from './tracker.route';

@NgModule({
  imports: [Eo2GatewaySharedModule, RouterModule.forChild([trackerRoute])],
  declarations: [TrackerComponent]
})
export class TrackerModule {}
