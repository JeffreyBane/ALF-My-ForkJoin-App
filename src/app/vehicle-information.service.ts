import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleInformationService {

  getDropDownData(dropDownType: string): Observable<any[]> {

    const mockJson = [

      { id: 1, type: 'Color', value: 'White' },
      { id: 2, type: 'Color', value: 'Black' },
      { id: 3, type: 'Color', value: 'Silver' },
      { id: 4, type: 'Color', value: 'Blue' },
      { id: 5, type: 'Color', value: 'Red' },
      { id: 6, type: 'Color', value: 'Other' },

      { id: 7, type: 'Year', value: '2022' },
      { id: 8, type: 'Year', value: '2021' },
      { id: 9, type: 'Year', value: '2020' },
      { id: 10, type: 'Year', value: '2019' },
      { id: 11, type: 'Year', value: '2018' },

      { id: 12, type: 'Transmission', value: '5 Speed Manual' },
      { id: 13, type: 'Transmission', value: '6 Speed Manual' },
      { id: 14, type: 'Transmission', value: 'Automatic' }

    ];
    return of(mockJson.filter(item => item.type === dropDownType));
  }

  getVehicle(vehicleId: number): Observable<any> {

    const mockJson = [

      { id: 1, make: 'Ford', model: 'Luxoboat', price: 29999, color: 1, year: 9, transmission: 14 },
      { id: 2, make: 'Bentley', model: 'Excess', price: 249999, color: 4, year: 7, transmission: 14 },
      { id: 3, make: 'BMW', model: 'Service Loaner', price: 69999, color: 2, year: 7, transmission: 13 }

    ];
    return of(mockJson.filter(item => item.id === vehicleId)[0]);
  }
}