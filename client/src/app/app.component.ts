import { Component } from '@angular/core';
import { Feature, FeatureCollection, GeoJsonProperties, Point } from 'geojson';
import { MapboxGeoJSONFeature, MapLayerMouseEvent, MapMouseEvent } from 'mapbox-gl';
import { ApiService } from './api.service';
import { StateService } from './services/state/state.service';
import { Listing } from './types/api_types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  property_selected: boolean = false;

  constructor(private state: StateService) {
    state.SelectedListing.subscribe(listing => {
      console.log(listing)
      if (listing.name) {
        this.property_selected = true;
      }
    })
  }


}
