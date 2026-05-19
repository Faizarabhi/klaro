import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AidFormComponent } from './components/aid-form/aid-form.component';

const routes: Routes = [
  { path: '', component: AidFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BeneficiaryRoutingModule { }
