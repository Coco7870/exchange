import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FixerService } from '../fixer.service';
import { Currencies } from '../currencies';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css']
})
export class ConverterComponent {
  amount: number = 0;
  selectedFromCurrency: string = 'USD';
  selectedToCurrency: string = 'GBP';
  convertedValue: number | undefined;
  currencies = Currencies.currencies
  conversionRate: number = 0;

  constructor(private fixerService: FixerService) { }

  onAmountChange() {
    // Handle amount change logic here
  }

  swapCurrencies() {
    // Swap selectedFromCurrency and selectedToCurrency values
    const temp = this.selectedFromCurrency;
    this.selectedFromCurrency = this.selectedToCurrency;
    this.selectedToCurrency = temp;
  }

  convertCurrencies() {
    if(!this.amount){
      alert('Please enter amount')
    }
    // Call the currency service to convert the amount from selectedFromCurrency to selectedToCurrency
    this.fixerService.getLatestRates().subscribe((response: any) => {
      const rates = response.rates;
      if (rates.hasOwnProperty(this.selectedFromCurrency) && rates.hasOwnProperty(this.selectedToCurrency)) {
        const conversionRate = rates[this.selectedToCurrency] / rates[this.selectedFromCurrency];
        this.conversionRate = conversionRate
        this.convertedValue = this.amount * conversionRate;

      }
    }, error => {
      console.log('Cant convert')
    })
  }
}
