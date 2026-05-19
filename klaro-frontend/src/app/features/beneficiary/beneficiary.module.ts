import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BeneficiaryRoutingModule } from './beneficiary-routing.module';
import { AidFormComponent } from './components/aid-form/aid-form.component';

@NgModule({
  declarations: [
    AidFormComponent
  ],
  imports: [
    CommonModule,
    BeneficiaryRoutingModule,
    ReactiveFormsModule
  ]
})
export class BeneficiaryModule { }
