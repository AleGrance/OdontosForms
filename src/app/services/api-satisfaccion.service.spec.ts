import { TestBed } from '@angular/core/testing';

import { ApiSatisfaccionService } from './api-satisfaccion.service';

describe('ApiSatisfaccionService', () => {
  let service: ApiSatisfaccionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiSatisfaccionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
