import { TestBed } from '@angular/core/testing';

import { CreateEventFormService } from './create-event-form.service';

describe('CreateEventFormService', () => {
  let service: CreateEventFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateEventFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
