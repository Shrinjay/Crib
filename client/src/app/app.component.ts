import { Component, OnInit } from '@angular/core';
import { Feature, FeatureCollection, GeoJsonProperties, Point } from 'geojson';
import { MapboxGeoJSONFeature, MapLayerMouseEvent, MapMouseEvent } from 'mapbox-gl';
import { ApiService } from './api.service';
import { GetIpService } from './ip-service.service';
import { StateService } from './services/state/state.service';
import { MatDialog } from '@angular/material/dialog';
import { UserSurveyComponent } from './components/user-survey/user-survey.component';
import { Listing } from './types/api_types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  property_selected: boolean = false;

  constructor(
    private api: ApiService,
    private stateService: StateService,
    private getIpService: GetIpService,
    private dialog: MatDialog) {
    stateService.SelectedListing.subscribe(listing => {
      console.log(listing)
      if (listing.name) {
        this.property_selected = true;
      }
    })
  }

  ngOnInit(): void {
    this.getIpService.getIpAddress().subscribe(response =>
      this.api.incrementSourceCount(response.ip, this.stateService.getSource()).subscribe(response => {
        if (response.number_of_visits == 2) {
          const dialogRef = this.dialog.open(UserSurveyComponent, {
            width: '900px',
            height: '700px'
          });
        }
      })
    );
  }
}
