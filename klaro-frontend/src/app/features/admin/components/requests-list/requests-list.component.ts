import { Component, OnInit } from '@angular/core';
import { AidRequestService, AidRequestResponse } from '../../../../core/services/aid-request.service';
@Component({
  selector: 'app-requests-list',
  templateUrl: './requests-list.component.html',
  styleUrls: ['./requests-list.component.scss']
})
export class RequestsListComponent implements OnInit {
  requests: AidRequestResponse[] = [];

  constructor(private aidService: AidRequestService) {}

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests(): void {
    this.aidService.getAllRequests().subscribe(data => {
      this.requests = data;
    });
  }

  updateStatus(id: string, status: string): void {
    this.aidService.updateStatus(id, status).subscribe(() => {
      this.loadRequests();
    });
  }
}
