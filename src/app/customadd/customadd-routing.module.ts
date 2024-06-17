import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomaddPage } from './customadd.page';

const routes: Routes = [
  {
    path: '',
    component: CustomaddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomaddPageRoutingModule {}
