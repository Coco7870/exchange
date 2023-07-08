import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


const API_KEY = 'ff80c8f4c3423836c54d637892bc355c';
const BASE_URL = 'http://data.fixer.io/api/';

@Injectable({
  providedIn: 'root'
})
export class FixerService {
  constructor(private http: HttpClient) {}

  getLatestRates() {
    const url = `${BASE_URL}latest?access_key=${API_KEY}`;
    return this.http.get(url);
  }

  getHistoricalRates(date: string) {
    const url = `${BASE_URL}${date}?access_key=${API_KEY}`;
    return this.http.get(url);
  }
}
