import { TestBed } from '@angular/core/testing';

import { UserprofilesService } from './userprofiles.service';

describe('UserprofilesService', () => {
  let service: UserprofilesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserprofilesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
