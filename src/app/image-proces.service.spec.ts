import { TestBed } from '@angular/core/testing';

import { ImageProcesService } from './image-proces.service';

describe('ImageProcesService', () => {
  let service: ImageProcesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageProcesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
