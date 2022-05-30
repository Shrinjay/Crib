import { Component, OnInit, Input } from '@angular/core';
import { Feature, FeatureCollection, GeoJsonProperties, Point } from 'geojson';
import { LngLatLike, MapboxGeoJSONFeature, MapLayerMouseEvent, MapMouseEvent } from 'mapbox-gl';
import { StateService } from 'src/app/services/state/state.service';
import { Datasets } from 'src/app/types/api_types';
import { ApiService } from '../../../api.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {
  @Input() center: LngLatLike | undefined;

  title = 'client';
  selectedPoint: Feature<Point, GeoJsonProperties> | undefined = undefined;
  selectedData: Datasets = Datasets.crime;
  crime_data: FeatureCollection<Point, GeoJsonProperties> = {} as FeatureCollection<Point, GeoJsonProperties>;
  business_data: FeatureCollection<Point, GeoJsonProperties> = {} as FeatureCollection<Point, GeoJsonProperties>;
  geometry: FeatureCollection<Point, GeoJsonProperties> = {} as FeatureCollection<Point, GeoJsonProperties>;

  constructor(private api: ApiService, private stateService: StateService) {
    this.stateService.SelectedListing.subscribe(listing => {
      if (listing.crime_geodata_id !== "") this.getCrimeData(listing.crime_geodata_id);
      if (listing.business_geodata_id !== "") this.getBusinessData(listing.business_geodata_id)
    })
    this.stateService.SelectedData.subscribe(dataset => {
      this.selectedData = dataset
      switch (this.selectedData) {
        case Datasets.business: {
          this.geometry = this.business_data;
          break;
        }
        case Datasets.crime: {
          this.geometry = this.crime_data;
          break;
        }
      }
    })
  }

  getCrimeData(id: string) {
    this.api.getCrimeGeoData(id)
      .subscribe(data => this.crime_data = data)
  }

  getBusinessData(id: string) {
    this.api.getBusinessGeoData(id)
      .subscribe(data => this.business_data = data)
  }

  onClick(e: MapLayerMouseEvent) {
    this.selectedPoint = e?.features?.[0] as Feature<Point, GeoJsonProperties>;
  }

}
