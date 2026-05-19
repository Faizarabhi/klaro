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

@Injectable({
  providedIn: 'root'
})
export class AidRequestService {
  private readonly apiUrl = 'http://localhost:3000/api/aid-requests';

  constructor(private readonly http: HttpClient) {}

  // bénéficiaire créer une demande
  createRequest(payload: AidRequestPayload): Observable<AidRequestResponse> {
    return this.http.post<AidRequestResponse>(this.apiUrl, payload);
  }

  // admin récupérer la liste complète
  getAllRequests(): Observable<AidRequestResponse[]> {
    return this.http.get<AidRequestResponse[]>(this.apiUrl);
  }

  // admin valider ou refuser une demande
  updateStatus(id: string, status: string): Observable<AidRequestResponse> {
    return this.http.patch<AidRequestResponse>(`${`${this.apiUrl}/${id}`}/status`, { status });
  }
}
