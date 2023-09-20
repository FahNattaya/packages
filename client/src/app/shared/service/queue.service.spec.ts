import { TestBed } from '@angular/core/testing';

import { QueueService } from './queue.service';
import { SharedService } from './shared.service';
const httpMock = {
  post: jest.fn(),
};
describe('QueueService', () => {
  let service: QueueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = new QueueService(new SharedService(), httpMock as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
