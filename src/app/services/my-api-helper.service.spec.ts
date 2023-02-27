import { TestBed } from '@angular/core/testing';

import { MyApiHelperService } from './my-api-helper.service';

describe('MyApiHelperService', () => {
  let service: MyApiHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyApiHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
