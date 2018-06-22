import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component'
import { MineHomeComponent } from './mines/mine-home.component'
import { MineCreateShipmentComponent } from './mines/mine-create-shipment.component'
import { LogisticsCompanyHomeComponent } from './logistics/logistics-company-home.component'
import { ManageShipmentComponent } from './logistics/manage-shipment.component'
import { SmelterHomeComponent } from './smelter/smelter-home.component'
import { SmelterManageShipmentComponent } from './smelter/smelter-manage-shipment.component'

import { AuthGuard } from './_guard/auth.guard'




const routes: Routes = [
    //Default route
  { path: 'mine/home', component: MineHomeComponent ,canActivate: [AuthGuard]},
  { path: 'mine/create-shipment', component: MineCreateShipmentComponent ,canActivate: [AuthGuard]},
  { path: 'logistics/home', component: LogisticsCompanyHomeComponent ,canActivate: [AuthGuard]},
  { path: 'logistics/acknlowdege-shipment', component: ManageShipmentComponent,canActivate: [AuthGuard],data:{ status:'SHIPMENT_INITIATED_FROM_MINE', canEdit: true} },
  { path: 'logistics/deliver-shipment', component: ManageShipmentComponent,canActivate: [AuthGuard],data:{ status:'SHIPMENT_ACKNOWLEDGED', canEdit: false} },
  
  { path: 'smelter/home', component: SmelterHomeComponent,canActivate: [AuthGuard] },
  { path: 'smelter/manage-shipment', component: SmelterManageShipmentComponent,canActivate: [AuthGuard] },
  
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'login' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
