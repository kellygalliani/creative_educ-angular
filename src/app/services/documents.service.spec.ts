import { TestBed } from '@angular/core/testing';

import {RetrieveProjectsService } from './documents.service';

describe('DocumentsService', () => {
  let service:RetrieveProjectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RetrieveProjectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
