import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssignedpagesPage } from './assignedpages.page';

const routes: Routes = [
  {
    path: '',
    component: AssignedpagesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssignedpagesPageRoutingModule {}
