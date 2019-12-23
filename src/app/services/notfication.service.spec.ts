import { TestBed } from '@angular/core/testing';

import { NotficationService } from './notfication.service';

describe('NotficationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NotficationService = TestBed.get(NotficationService);
    expect(service).toBeTruthy();
  });
});
