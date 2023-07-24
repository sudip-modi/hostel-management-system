import { TestBed } from '@angular/core/testing';

import { AddHelpService } from './add-help.service';

describe('AddHelpService', () => {
  let service: AddHelpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddHelpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
