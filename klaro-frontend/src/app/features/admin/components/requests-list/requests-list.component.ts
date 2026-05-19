import { Component, OnInit } from '@angular/core';
import {
  AidRequestService,
  AidRequestResponse,
} from '../../../../core/services/aid-request.service';
@Component({
  selector: 'app-requests-list',
  templateUrl: './requests-list.component.html',
  styleUrls: ['./requests-list.component.scss'],
})
export class RequestsListComponent implements OnInit {
  requests: AidRequestResponse[] = [];
  total = 0;
  page = 1;
  limit = 10;
  totalPages = 1;
  isUpdating = false;
  successMessage = '';
  errorMessage = '';

  constructor(private aidService: AidRequestService) {}

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests(): void {
    this.errorMessage = '';
    this.aidService
      .getAllRequests(this.page, this.limit)
      .subscribe((response) => {
        this.requests = response.data;
        this.total = response.total;
        this.totalPages = response.totalPages;
      });
  }

  goToPreviousPage(): void {
    if (this.page <= 1) {
      return;
    }

    this.page -= 1;
    this.loadRequests();
  }

  goToNextPage(): void {
    if (this.page >= this.totalPages) {
      return;
    }

    this.page += 1;
    this.loadRequests();
  }

  onLimitChange(limitValue: string): void {
    this.limit = Number(limitValue);
    this.page = 1;
    this.loadRequests();
  }

  canMoveToUnderReview(request: AidRequestResponse): boolean {
    return request.status === 'PENDING';
  }

  canApprove(request: AidRequestResponse): boolean {
    return request.status === 'UNDER_REVIEW';
  }

  canReject(request: AidRequestResponse): boolean {
    return request.status === 'PENDING' || request.status === 'UNDER_REVIEW';
  }

  updateStatus(id: string, status: string): void {
    this.isUpdating = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.aidService.updateStatus(id, status).subscribe(
      () => {
        this.isUpdating = false;
        this.successMessage = `Statut mis a jour: ${status}`;
        this.loadRequests();
      },
      (err) => {
        this.isUpdating = false;
        this.errorMessage =
          err?.error?.message || 'Transition de statut invalide.';
      },
    );
  }
}
