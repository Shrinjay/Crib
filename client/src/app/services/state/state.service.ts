import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Datasets, Listing } from 'src/app/types/api_types';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor() { }

  SelectedListing: BehaviorSubject<Listing> = new BehaviorSubject<Listing>({name: "", Latitude: 0.0, Longitude: 0.0, crime_geodata_id: "", business_geodata_id: ""});
  SelectedCity: BehaviorSubject<string> = new BehaviorSubject<string>("");
  SelectedData: Subject<Datasets> = new Subject<Datasets>();
}
