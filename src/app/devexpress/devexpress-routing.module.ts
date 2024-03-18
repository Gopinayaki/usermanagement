import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DevexpressPage } from './devexpress.page';

const routes: Routes = [
  {
    path: '',
    component: DevexpressPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DevexpressPageRoutingModule {}
