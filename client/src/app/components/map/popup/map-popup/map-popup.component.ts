import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Feature, Point, GeoJsonProperties } from 'geojson';
import { StateService } from 'src/app/services/state/state.service';
import { Datasets } from 'src/app/types/api_types';

@Component({
  selector: 'app-map-popup',
  templateUrl: './map-popup.component.html',
  styleUrls: ['./map-popup.component.css']
})
export class MapPopupComponent implements OnInit, OnChanges {

  @Input() point: Feature<Point, GeoJsonProperties> | undefined = undefined;
  @Input() dataset: Datasets | null = null;

  crime_selected: boolean = false;
  business_selected: boolean = false;

  constructor() {}

  ngOnInit(): void {
    if (this.point?.properties) {
      this.point.properties['distance'] = Math.round(this.point.properties['distance']);
    }
    switch(this.dataset) {
      case(Datasets.crime): {
        this.business_selected = false;
        this.crime_selected = true;
        break;
      }
      case(Datasets.business): {
        this.business_selected = true;
        this.crime_selected = false;
        break;
      }
    }
  }

  ngOnChanges() {
    if (this.point?.properties) {
      this.point.properties['distance'] = Math.round(this.point.properties['distance']);
    }
    switch(this.dataset) {
      case(Datasets.crime): {
        this.business_selected = false;
        this.crime_selected = true;
        break;
      }
      case(Datasets.business): {
        this.business_selected = true;
        this.crime_selected = false;
        break;
      }
    }
  }

}
