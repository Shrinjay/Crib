import { Component, Input, OnInit } from '@angular/core';
import { FeatureCollection, GeoJsonProperties, Point } from 'geojson';
import { LngLatLike } from 'mapbox-gl';
import { ApiService } from 'src/app/api.service';
import { StateService } from 'src/app/services/state/state.service';
import { BusinessMetrics, CrimeMetrics } from 'src/app/types/api_types';

@Component({
  selector: 'app-crime-overview',
  templateUrl: './crime-overview.component.html',
  styleUrls: ['./crime-overview.component.css']
})
export class CrimeOverviewComponent {
  @Input() showDatasets: boolean = false;

  title = '';
  crimeMetrics: CrimeMetrics = {} as CrimeMetrics;
  businessMetrics: BusinessMetrics = {} as BusinessMetrics;
  center: LngLatLike | undefined = [-80.5204, 43.4643]
  summaryIndex: number = 0;
  businessIndex: number = 0;

  showBusiness: boolean = false;
  showCrime: boolean = true;

  constructor(private api: ApiService, private stateService: StateService) {
    window.analytics.page('Property')
    this.stateService.SelectedListing.subscribe(listing => {
      this.getCrimeData(listing.crime_geodata_id);
      this.getBusinessData(listing.business_geodata_id)
      this.center = [listing.Longitude, listing.Latitude]
      this.title = listing.name;

      if (listing.crime_geodata_id !== "") this.showCrime = true;
      if (listing.business_geodata_id !== "") this.showBusiness = true;
    })
  }

  getCrimeData(id: string) {
    this.api.getCrimeMetrics(id)
      .subscribe(data => {
        this.crimeMetrics = data
        const index = Math.round(this.crimeMetrics.index)
        if (index < 0) this.summaryIndex = 0;
        if (index > 100) this.summaryIndex = 100;
        else this.summaryIndex = index
      });
  }

  getBusinessData(id: string) {
    this.api.getBusinessMetrics(id)
    .subscribe(data => {
      this.businessMetrics = data;
      const index = Math.round(data.index)
      if (index < 0) this.businessIndex = 0;
      if (index > 100) this.businessIndex = 100;
      else this.businessIndex = index
    })
  }
}
