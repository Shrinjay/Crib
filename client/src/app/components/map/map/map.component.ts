import { Component, OnInit } from '@angular/core';
import { Feature, FeatureCollection, GeoJsonProperties, Point } from 'geojson';
import { MapboxGeoJSONFeature, MapLayerMouseEvent, MapMouseEvent } from 'mapbox-gl';
import { StateService } from 'src/app/services/state/state.service';
import { ApiService } from '../../../api.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {

  title = 'client';
  selectedPoint: Feature<Point, GeoJsonProperties> | undefined = undefined;
  geometry: FeatureCollection<Point, GeoJsonProperties> = {} as FeatureCollection<Point, GeoJsonProperties>;

  constructor(private api: ApiService, private stateService: StateService) {
    this.stateService.SelectedListingCrimeGeodataId.subscribe(id => this.getCrimeData(id))
  }

  getCrimeData(id: string) {
    this.api.getCrimeGeoData(id)
      .subscribe(data => this.geometry = data)
  }

  onClick(e: MapLayerMouseEvent) {
    console.log(e?.features)
    this.selectedPoint = e?.features?.[0] as Feature<Point, GeoJsonProperties>;
  }

}
