import { Component, OnInit, Input } from '@angular/core';
import { Feature, FeatureCollection, GeoJsonProperties, Point } from 'geojson';
import { LngLatLike, MapboxGeoJSONFeature, MapLayerMouseEvent, MapMouseEvent } from 'mapbox-gl';
import { CrimeTransformService } from 'src/app/services/crime-transform.service';
import { StateService } from 'src/app/services/state/state.service';
import { Datasets } from 'src/app/types/api_types';
import { BinnedFeatures, Features } from 'src/app/types/crime_overview_types';
import { ApiService } from '../../../api.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @Input() center: LngLatLike | undefined;
  @Input() showDatasets: boolean = false;

  centerGeoJson: any = null;

  showFilter: boolean = false;
  minzoom: number = 0;

  title = 'client';
  selectedPoint: Feature<Point, GeoJsonProperties> | undefined = undefined;
  selectedData: Datasets | null = null;
  selectedOption: string | null = null;
  
  crime_data: Features = {} as Features;
  business_data: Features = {} as Features;
  binnedCrimeData: BinnedFeatures = {} as BinnedFeatures
  binnedBusinessData: BinnedFeatures = {} as BinnedFeatures

  crimeTypes: string[] = []
  businessTypes: string[] = []

  binnedGeometry: BinnedFeatures = {} as BinnedFeatures
  options: string[] = []
  geometry: Features = {} as Features;

  constructor(private api: ApiService, private stateService: StateService, private transformer: CrimeTransformService) {
    this.centerGeoJson = {
      type: 'geojson',
      data: {
          type: 'FeatureCollection',
          features: [
          {
              type: 'Feature',
              geometry: {
              type: 'Point',
              coordinates: this.center
              }
          }
          ]
      }
      }

      console.log(this.centerGeoJson)

    this.stateService.SelectedListing.subscribe(listing => {
      if (listing.crime_geodata_id !== "") this.getCrimeData(listing.crime_geodata_id);
      if (listing.business_geodata_id !== "") this.getBusinessData(listing.business_geodata_id)
    })
    this.stateService.SelectedData.subscribe(dataset => {
      this.selectedData = dataset
      this.selectedOption = null;
      switch (this.selectedData) {
        case Datasets.business: {
          this.geometry = this.business_data;
          this.binnedGeometry = this.binnedBusinessData;
          this.options = this.businessTypes;
          break;
        }
        case Datasets.crime: {
          this.geometry = this.crime_data;
          this.binnedGeometry = this.binnedCrimeData;
          this.options = this.crimeTypes;
          break;
        }
      }
      if (!this.options.includes("Clear filter")) this.options.unshift("Clear filter")
    })
  }

  ngOnInit(): void {
    console.log(this.center)
    this.centerGeoJson = {
      type: 'geojson',
      data: {
          type: 'FeatureCollection',
          features: [
          {
              type: 'Feature',
              geometry: {
              type: 'Point',
              coordinates: this.center
              }
          }
          ]
      }
      }
  }

  getCrimeData(id: string) {
    this.api.getCrimeGeoData(id)
      .subscribe(data => {
        this.crime_data = data;
        this.binnedCrimeData = this.transformer.binDataByType(data, "CrimeType")
        this.crimeTypes = Object.keys(this.binnedCrimeData)
      })
  }

  getBusinessData(id: string) {
    this.api.getBusinessGeoData(id)
      .subscribe(data => {
        this.business_data = data
        this.binnedBusinessData = this.transformer.binDataByType(data, "Category")
        this.businessTypes = Object.keys(this.binnedBusinessData)
      })
  }

  onClick(e: MapLayerMouseEvent) {
    this.selectedPoint = e?.features?.[0] as Feature<Point, GeoJsonProperties>;
  }

  onSelect(option: string) {
    if (option === "Clear filter") {
      this.selectedOption = null;
      if (this.selectedData === Datasets.business) {
        this.geometry = this.business_data;
      } else if (this.selectedData === Datasets.crime) {
        this.geometry = this.crime_data;
      }
    } else {
      this.geometry = this.binnedGeometry[option]
      this.selectedOption = option;
    }
  }

}
