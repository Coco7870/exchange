import { ConverterComponent } from './converter.component';
import { FixerService } from '../fixer.service';
import { of } from 'rxjs';

describe('ConverterComponent', () => {
  let component: ConverterComponent;
  let fixerService: jasmine.SpyObj<FixerService>;

  beforeEach(() => {
    fixerService = jasmine.createSpyObj('FixerService', ['getLatestRates']);
    component = new ConverterComponent(fixerService);
  });

  it('should calculate the converted value', () => {
    // Mock the response from the FixerService
    const rates = {
      USD: 1,
      GBP: 0.75
    };
    fixerService.getLatestRates.and.returnValue(of({ rates }));

    // Set the component properties
    component.amount = 100;
    component.selectedFromCurrency = 'USD';
    component.selectedToCurrency = 'GBP';

    // Call the convertCurrencies() method
    component.convertCurrencies();

    // Check the expected values
    expect(component.conversionRate).toBe(0.75);
    expect(component.convertedValue).toBe(75);
  });
});
