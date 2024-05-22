import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssignedreportsPage } from './assignedreports.page';

const routes: Routes = [
  {
    path: '',
    component: AssignedreportsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssignedreportsPageRoutingModule {}
