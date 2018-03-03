import { TestBed, inject } from '@angular/core/testing';

import { PolyService } from './poly.service';

describe('PolyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PolyService]
    });
  });

  it('should be created', inject([PolyService], (service: PolyService) => {
    expect(service).toBeTruthy();
  }));
});
