import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { NavbarComponent } from './navbar/navbar.component'
import { NavbarService } from './navbar/navbar.service'

import { LoginComponent } from './login/login.component'
import { SpinnerComponent} from './_helper/spinner.component'

import { AuthenticationService } from './_services/authentication.service';
import { NavFooterComponent } from './navbar/nav-footer.component';
import { MineHomeComponent } from './mines/mine-home.component';
import { MineCreateShipmentComponent } from './mines/mine-create-shipment.component';
import { ManageShipmentComponent } from './logistics/manage-shipment.component';
import { LogisticsCompanyHomeComponent } from './logistics/logistics-company-home.component';
import { ViewShipmentListComponent } from './logistics/view-shipment-list.component';
import { SmelterHomeComponent } from './smelter/smelter-home.component';
import { AuthGuard } from './_guard/auth.guard';
import { SmelterManageShipmentComponent } from './smelter/smelter-manage-shipment.component'
import { SupplyChainDataService } from './_services/supply-chain-data.service'



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    SpinnerComponent,
    NavFooterComponent,
    MineHomeComponent,
    MineCreateShipmentComponent,
    ManageShipmentComponent,
    LogisticsCompanyHomeComponent,
    ViewShipmentListComponent,
    SmelterHomeComponent,
    SmelterManageShipmentComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    AppRoutingModule
    
  ],
  providers: [AuthenticationService,NavbarService, AuthGuard,SupplyChainDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
