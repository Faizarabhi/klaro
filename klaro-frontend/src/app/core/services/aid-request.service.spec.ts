import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AidRequestService } from './aid-request.service';

describe('AidRequestService', () => {
  let service: AidRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AidRequestService]
    });
    service = TestBed.inject(AidRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
