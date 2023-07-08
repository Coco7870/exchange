import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Currencies } from '../currencies';
import { FixerService } from '../fixer.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  fromCurrency: string = '';
  toCurrency: string = '';
  amount: number = 0;
  currencies = Currencies.currencies
  chartData: any; // Data for the historical chart
  conversionRate: number = 0;
  convertedValue: number = 0;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fixerService: FixerService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.fromCurrency = params.from;
      this.toCurrency = params.to;
      this.amount = Number(params.amount);
    });
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }

  convert(): void {
    if(!this.amount){
      alert('Please enter amount')
    }
    // Call the currency service to convert the amount from selectedFromCurrency to selectedToCurrency
    this.fixerService.getLatestRates().subscribe((response: any) => {
      const rates = response.rates;
      if (rates.hasOwnProperty(this.fromCurrency) && rates.hasOwnProperty(this.toCurrency)) {
        const conversionRate = rates[this.toCurrency] / rates[this.fromCurrency];
        this.conversionRate = conversionRate
        this.convertedValue = this.amount * conversionRate;

      }
    }, error => {
      console.log('Cant convert')
    })
  }
  getCurrencyName(code: string | undefined): string {
    const currency = this.currencies.find((currency) => currency.code === code);
    return currency ? currency.name : '';
  }
  getHistory() {
    this.fixerService.getHistoricalRates('2023-07-01').subscribe((res: any) => {
      this.chartData = res
    })
  }
  // Other methods and functionalities as needed
}
