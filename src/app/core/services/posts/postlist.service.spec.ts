import { TestBed } from '@angular/core/testing';

import { PostlistService } from './postlist.service';

describe('PostlistService', () => {
  let service: PostlistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostlistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
