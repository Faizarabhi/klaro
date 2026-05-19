import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminGuard } from './core/guards/admin.guard';

const routes: Routes = [
  {
    path: 'beneficiary',
    loadChildren: () =>
      import('./features/beneficiary/beneficiary.module').then(
        (m) => m.BeneficiaryModule,
      ),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./features/admin/admin.module').then((m) => m.AdminModule),
    canActivate: [adminGuard],
  },
  { path: '', redirectTo: 'beneficiary', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
