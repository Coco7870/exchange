import { DetailsComponent } from './details.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FixerService } from '../fixer.service';
import { of } from 'rxjs';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let route: ActivatedRoute;
  let router: Router;
  let fixerService: jasmine.SpyObj<FixerService>;

  beforeEach(() => {
    route = jasmine.createSpyObj('ActivatedRoute', ['params']);
    router = jasmine.createSpyObj('Router', ['navigate']);
    fixerService = jasmine.createSpyObj('FixerService', ['getLatestRates', 'getHistoricalRates']);
    component = new DetailsComponent(route, router, fixerService);
  });

  it('should initialize the component properties from the route params', () => {
    const params = {
      from: 'USD',
      to: 'GBP',
      amount: '100'
    };
    route.params = of(params);

    component.ngOnInit();

    expect(component.fromCurrency).toBe('USD');
    expect(component.toCurrency).toBe('GBP');
    expect(component.amount).toBe(100);
  });

  it('should navigate back to home page', () => {
    component.goBack();

    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should calculate the converted value', () => {
    const rates = {
      USD: 1,
      GBP: 0.75
    };
    fixerService.getLatestRates.and.returnValue(of({ rates }));

    component.amount = 100;
    component.fromCurrency = 'USD';
    component.toCurrency = 'GBP';

    component.convert();

    expect(component.conversionRate).toBe(0.75);
    expect(component.convertedValue).toBe(75);
  });

  it('should return the currency name based on the code', () => {
    const code = 'USD';
    const expectedName = 'United States Dollar';
    const currencies = [
      { code: 'USD', name: 'United States Dollar' },
      { code: 'GBP', name: 'British Pound' }
    ];
    component.currencies = currencies;

    const result = component.getCurrencyName(code);

    expect(result).toBe(expectedName);
  });

  it('should fetch historical rates and set the chart data', () => {
    const expectedChartData = { /* mocked chart data */ };
    fixerService.getHistoricalRates.and.returnValue(of(expectedChartData));

    component.getHistory();

    expect(fixerService.getHistoricalRates).toHaveBeenCalledWith('2023-07-01');
    expect(component.chartData).toBe(expectedChartData);
  });

  // Add more test cases for other methods and functionalities as needed
});
