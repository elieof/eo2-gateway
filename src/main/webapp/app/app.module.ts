import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { Eo2GatewaySharedModule } from 'app/shared/shared.module';
import { Eo2GatewayCoreModule } from 'app/core/core.module';
import { Eo2GatewayAppRoutingModule } from './app-routing.module';
import { Eo2GatewayHomeModule } from './home/home.module';
import { Eo2GatewayEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    Eo2GatewaySharedModule,
    Eo2GatewayCoreModule,
    Eo2GatewayHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    Eo2GatewayEntityModule,
    Eo2GatewayAppRoutingModule
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, ActiveMenuDirective, FooterComponent],
  bootstrap: [MainComponent]
})
export class Eo2GatewayAppModule {}
