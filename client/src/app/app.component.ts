import { Component, OnInit } from '@angular/core';
import { Feature, FeatureCollection, GeoJsonProperties, Point } from 'geojson';
import { MapboxGeoJSONFeature, MapLayerMouseEvent, MapMouseEvent } from 'mapbox-gl';
import { ApiService } from './api.service';
import { GetIpService } from './ip-service.service';
import { StateService } from './services/state/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private api: ApiService, private stateService: StateService, private getIpService: GetIpService) {
  }

  ngOnInit(): void {
    this.getIpService.getIpAddress().subscribe(response =>
      this.api.incrementSourceCount(response.ip, this.stateService.getSource()).subscribe()
    );
  }
}
