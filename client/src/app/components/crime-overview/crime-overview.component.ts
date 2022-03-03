import { Component, OnInit } from '@angular/core';
import { FeatureCollection, GeoJsonProperties, Point } from 'geojson';
import { LngLatLike } from 'mapbox-gl';
import { ApiService } from 'src/app/api.service';
import { StateService } from 'src/app/services/state/state.service';
import { CrimeMetrics } from 'src/app/types/api_types';

@Component({
  selector: 'app-crime-overview',
  templateUrl: './crime-overview.component.html',
  styleUrls: ['./crime-overview.component.css']
})
export class CrimeOverviewComponent {

  title = '';
  crimeMetrics: CrimeMetrics = {} as CrimeMetrics;
  center: LngLatLike | undefined = [-80.5204, 43.4643]

  constructor(private api: ApiService, private stateService: StateService) {
    this.stateService.SelectedListing.subscribe(listing => {
      this.getCrimeData(listing.crime_geodata_id);
      this.center = [listing.Longitude, listing.Latitude]
      this.title = listing.name;
    })
  }

  getCrimeData(id: string) {
    this.api.getCrimeMetrics(id)
      .subscribe(data => this.crimeMetrics = data);
  }
}
