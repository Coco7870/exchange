import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FixerService } from './fixer.service';

describe('FixerService', () => {
  let service: FixerService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FixerService]
    });
    service = TestBed.inject(FixerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve the latest rates from the API', () => {
    const expectedResponse = { /* mocked response */ };
    service.getLatestRates().subscribe((response: any) => {
      expect(response).toEqual(expectedResponse);
    });

    const request = httpMock.expectOne('http://data.fixer.io/api/latest?access_key=ff80c8f4c3423836c54d637892bc355c');
    expect(request.request.method).toBe('GET');
    request.flush(expectedResponse);
  });

  it('should retrieve historical rates from the API for a specific date', () => {
    const date = '2023-07-01';
    const expectedResponse = { /* mocked response */ };
    service.getHistoricalRates(date).subscribe((response: any) => {
      expect(response).toEqual(expectedResponse);
    });

    const request = httpMock.expectOne(`http://data.fixer.io/api/${date}?access_key=ff80c8f4c3423836c54d637892bc355c`);
    expect(request.request.method).toBe('GET');
    request.flush(expectedResponse);
  });

});
