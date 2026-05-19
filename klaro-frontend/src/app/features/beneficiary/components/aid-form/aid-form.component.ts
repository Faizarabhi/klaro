import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  AidRequestResponse,
  AidRequestService,
} from '../../../../core/services/aid-request.service';

@Component({
  selector: 'app-aid-form',
  templateUrl: './aid-form.component.html',
  styleUrls: ['./aid-form.component.scss'],
})
export class AidFormComponent implements OnInit {
  aidForm!: FormGroup;
  requests: AidRequestResponse[] = [];
  totalRequests = 0;
  requestPage = 1;
  requestLimit = 5;
  totalRequestPages = 1;
  isSubmitting = false;
  isLoadingRequests = false;
  successMessage = '';
  errorMessage = '';
  readonly defaultBeneficiaryId = '68d66bdd-8a02-4d4c-bb54-9db29953f2f8';

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
    this.loadBeneficiaryRequests();
  }

  private initForm(): void {
    this.aidForm = this.fb.group({
      beneficiaryId: [this.defaultBeneficiaryId, [Validators.required]],
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
          beneficiaryId: this.defaultBeneficiaryId,
        });
        this.loadBeneficiaryRequests();
      },
      error: (err) => {
        this.isSubmitting = false;
        this.errorMessage =
          "Une erreur est survenue lors de l'envoi de la demande. Veuillez réessayer.";
        console.error(err);
      },
    });
  }

  private loadBeneficiaryRequests(): void {
    const beneficiaryId =
      this.aidForm?.get('beneficiaryId')?.value ?? this.defaultBeneficiaryId;

    this.isLoadingRequests = true;
    this.aidService
      .getBeneficiaryRequests(
        beneficiaryId,
        this.requestPage,
        this.requestLimit,
      )
      .subscribe({
        next: (response) => {
          this.requests = response.data;
          this.totalRequests = response.total;
          this.totalRequestPages = response.totalPages;
          this.isLoadingRequests = false;
        },
        error: () => {
          this.requests = [];
          this.totalRequests = 0;
          this.totalRequestPages = 1;
          this.isLoadingRequests = false;
        },
      });
  }

  goToPreviousRequestPage(): void {
    if (this.requestPage <= 1) {
      return;
    }

    this.requestPage -= 1;
    this.loadBeneficiaryRequests();
  }

  goToNextRequestPage(): void {
    if (this.requestPage >= this.totalRequestPages) {
      return;
    }

    this.requestPage += 1;
    this.loadBeneficiaryRequests();
  }

  onRequestLimitChange(limitValue: string): void {
    this.requestLimit = Number(limitValue);
    this.requestPage = 1;
    this.loadBeneficiaryRequests();
  }
}
