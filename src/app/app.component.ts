import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { catchError, concatMap, delay, forkJoin, of, throwError } from 'rxjs';
import { VehicleInformationService } from './vehicle-information.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  colors: any[];
  years: any[];
  transmissions: any[];
  vehicle: any;
  divClass = 'light';

  colorSelect: FormControl;
  yearSelect: FormControl;
  transmissionSelect: FormControl;
  make: FormControl;
  model: FormControl;
  price: FormControl;

  myFormGroup: FormGroup;


  ngOnInit(): void {

    this.colorSelect = new FormControl('');
    this.yearSelect = new FormControl('');
    this.transmissionSelect = new FormControl('');
    this.make = new FormControl('');
    this.model = new FormControl('');
    this.price = new FormControl('');

    this.myFormGroup = new FormGroup({
      colorSelect: this.colorSelect,
      yearSelect: this.yearSelect,
      transmissionSelect: this.transmissionSelect,
      make: this.make,
      model: this.model,
      price: this.price
    })
  }


  constructor(private _vehicleInformationService: VehicleInformationService) {

    // 1) dropdowns only
    /*
    this.divClass = 'light';
    forkJoin([
      _vehicleInformationService.getDropDownData('Color'),
      _vehicleInformationService.getDropDownData('Year'),
      _vehicleInformationService.getDropDownData('Transmission')
    ]).subscribe((dds) =>

      setTimeout(() => {

        this.colors = dds[0];
        this.years = dds[1];
        this.transmissions = dds[2];

        this.divClass = 'normal';

      }, 2000)

    );
    */

    // 2) completed form


    this.divClass = 'light';

    _vehicleInformationService.getVehicle(2).pipe(concatMap((data) => {
      this.vehicle = data;
      return forkJoin([
        _vehicleInformationService.getDropDownData('Color'),
        _vehicleInformationService.getDropDownData('Year'),
        _vehicleInformationService.getDropDownData('Transmission')
      ]).pipe(delay(2000))
    }
    )).subscribe((dds) => {
      console.log(this.vehicle);
      this.colors = dds[0];
      this.years = dds[1];
      this.transmissions = dds[2];

      // set form values
      this.colorSelect.setValue(this.vehicle['color']);
      this.yearSelect.setValue(this.vehicle['year']);
      this.transmissionSelect.setValue(this.vehicle['transmission']);
      this.make.setValue(this.vehicle['make']);
      this.model.setValue(this.vehicle['model']);
      this.price.setValue(this.vehicle['price']);

      this.divClass = 'normal';
    });

  


    // 3) Handling errors 
    /*
    this.divClass = 'light';

    _vehicleInformationService.getVehicle(1).pipe(concatMap((data) => {
      this.vehicle = data;
      return forkJoin([
        // _vehicleInformationService.getDropDownData('Color').pipe(catchError(error => of(error))),
        throwError(() => new Error('Some error occurred')).pipe(catchError(error => of(error))),
        _vehicleInformationService.getDropDownData('Year').pipe(catchError(error => of(error))),
        _vehicleInformationService.getDropDownData('Transmission').pipe(catchError(error => of(error)))
      ]).pipe(delay(2000))
    }
    )).subscribe((dds) => {

      if (!(dds[0] instanceof Error)) {
        this.colors = dds[0];
      }

      if (!(dds[1] instanceof Error)) {
        this.years = dds[1];
      }

      if (!(dds[2] instanceof Error)) {
        this.transmissions = dds[2];
      }

      this.colorSelect.setValue(this.vehicle['color']);
      this.yearSelect.setValue(this.vehicle['year']);
      this.transmissionSelect.setValue(this.vehicle['transmission']);
      this.make.setValue(this.vehicle['make']);
      this.model.setValue(this.vehicle['model']);
      this.price.setValue(this.vehicle['price']);
      this.divClass = 'normal';
    });
    */



  }





}
