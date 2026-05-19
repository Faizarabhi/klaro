import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AidRequestPayload {
  beneficiaryId: string;
  category: string;
  amount: number;
  description: string;
}

export interface AidRequestResponse {
  id: string;
  beneficiaryId: string;
  category: string;
  amount: number;
  description: string;
  status: 'PENDING' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED';
  createdAt: string;
}

export interface PaginatedAidRequestsResponse {
  data: AidRequestResponse[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

@Injectable({
  providedIn: 'root',
})
export class AidRequestService {
  private readonly apiUrl = 'http://localhost:3000/api/aid-requests';

  constructor(private readonly http: HttpClient) {}

  // bénéficiaire créer une demande
  createRequest(payload: AidRequestPayload): Observable<AidRequestResponse> {
    return this.http.post<AidRequestResponse>(this.apiUrl, payload);
  }

  // admin récupérer la liste complète paginée
  getAllRequests(
    page = 1,
    limit = 20,
  ): Observable<PaginatedAidRequestsResponse> {
    return this.http.get<PaginatedAidRequestsResponse>(
      `${this.apiUrl}?page=${page}&limit=${limit}`,
    );
  }

  // bénéficiaire récupérer ses demandes
  getBeneficiaryRequests(
    beneficiaryId: string,
    page = 1,
    limit = 20,
  ): Observable<PaginatedAidRequestsResponse> {
    return this.http.get<PaginatedAidRequestsResponse>(
      `${this.apiUrl}?beneficiaryId=${beneficiaryId}&page=${page}&limit=${limit}`,
    );
  }

  // admin valider ou refuser une demande
  updateStatus(id: string, status: string): Observable<AidRequestResponse> {
    return this.http.patch<AidRequestResponse>(
      `${`${this.apiUrl}/${id}`}/status`,
      { status },
    );
  }
}
