import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPagePage } from './main-page.page';
import { UsermanagementcompComponent } from '../usermanagementcomp/usermanagementcomp.component';
// import { UsermanagementPage } from '../usermanagement/usermanagement.page';
import { FormComponent } from '../form/form.component';
import { PagemanagementComponent } from '../pagemanagement/pagemanagement.component';
import { ReportmanagementComponent } from '../reportmanagement/reportmanagement.component';
import { HeirarchymanagemnetComponent } from '../heirarchymanagemnet/heirarchymanagemnet.component';
import { FtpmanagemnetComponent } from '../ftpmanagemnet/ftpmanagemnet.component';
import { ExternalactiviyComponent } from '../externalactiviy/externalactiviy.component';
import { SmscongigComponent } from '../smscongig/smscongig.component';
import { SupportComponent } from '../support/support.component';

const routes: Routes = [
  {
    path: 'main-page',
    component: MainPagePage,
    children: [
      {
        path: 'usercomponmentcomp',
        component:UsermanagementcompComponent
      },
      {
        path: 'form',
        component: FormComponent
      },
      {
        path: 'pagemanagement',
        component: PagemanagementComponent
      },
      {
        path: 'reportmanagemnet',
        component: ReportmanagementComponent
      },
      {
        path: 'heirarchymanagemnet',
        component: HeirarchymanagemnetComponent
      },
      {
        path: 'fptmanagement',
        component: FtpmanagemnetComponent
      },
      {
        path: 'externalactiviy',
        component: ExternalactiviyComponent
      },
      
      {
        path: 'smscongig',
        component: SmscongigComponent
      },
      {
        path: 'support',
        component:SupportComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPagePageRoutingModule {}
