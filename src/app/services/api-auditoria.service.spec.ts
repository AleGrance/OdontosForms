import { TestBed } from '@angular/core/testing';

import { ApiAuditoriaService } from './api-auditoria.service';

describe('ApiAuditoriaService', () => {
  let service: ApiAuditoriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiAuditoriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
