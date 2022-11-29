import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobApplyComponent } from './job-apply/job-apply.component';
import { JobListComponent } from './job-list/job-list.component';

const routes: Routes = [
  { path: 'apply', component: JobApplyComponent },
  { path: 'list', component: JobListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
