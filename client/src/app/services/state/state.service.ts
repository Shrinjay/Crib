import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Datasets, Listing } from 'src/app/types/api_types';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor() { }

  SelectedListing: Subject<Listing> = new Subject<Listing>();
  SelectedData: Subject<Datasets> = new Subject<Datasets>();
}
