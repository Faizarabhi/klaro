import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AidRequestService } from '../../../../core/services/aid-request.service';

@Component({
  selector: 'app-aid-form',
  templateUrl: './aid-form.component.html',
  styleUrls: ['./aid-form.component.scss'],
})
export class AidFormComponent implements OnInit {
  aidForm!: FormGroup;
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  categories = [
    { value: 'HOUSING', label: 'Aide au Logement' },
    { value: 'FOOD', label: 'Aide Alimentaire' },
    { value: 'HEALTH', label: 'Couverture Santé' },
    { value: 'ENERGY', label: 'Énergie / Factures' },
    { value: 'OTHER', label: 'Autre' },
  ];

  constructor(
    private readonly fb: FormBuilder,
    private readonly aidService: AidRequestService,
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.aidForm = this.fb.group({
      beneficiaryId: [
        '68d66bdd-8a02-4d4c-bb54-9db29953f2fnkhliwh8',
        [Validators.required],
      ],
      category: ['', [Validators.required]],
      amount: [null, [Validators.required, Validators.min(1)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  onSubmit(): void {
    if (this.aidForm.invalid) {
      this.aidForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.aidService.createRequest(this.aidForm.value).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.successMessage = ` Demande soumise avec succès ! Numéro de dossier : ${response.id}`;
        this.aidForm.reset({
          beneficiaryId: '68d66bdd-8a02-4d4c-bb54-9db29953f2f8',
        });
      },
      error: (err) => {
        this.isSubmitting = false;
        this.errorMessage =
          "Une erreur est survenue lors de l'envoi de la demande. Veuillez réessayer.";
        console.error(err);
      },
    });
  }
}
