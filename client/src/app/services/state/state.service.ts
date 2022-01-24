import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor() { }

  SelectedListingCrimeGeodataId: Subject<string> = new Subject<string>();
}
