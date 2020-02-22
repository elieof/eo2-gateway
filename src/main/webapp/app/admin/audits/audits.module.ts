import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Eo2GatewaySharedModule } from 'app/shared/shared.module';

import { AuditsComponent } from './audits.component';

import { auditsRoute } from './audits.route';

@NgModule({
  imports: [Eo2GatewaySharedModule, RouterModule.forChild([auditsRoute])],
  declarations: [AuditsComponent]
})
export class AuditsModule {}
