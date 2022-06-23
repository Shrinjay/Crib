import { Component, OnInit, Input } from '@angular/core';
import { Feature, FeatureCollection, GeoJsonProperties, Point } from 'geojson';
import { LngLatLike, MapboxGeoJSONFeature, MapLayerMouseEvent, MapMouseEvent } from 'mapbox-gl';
import { CrimeTransformService } from 'src/app/services/crime-transform.service';
import { StateService } from 'src/app/services/state/state.service';
import { Datasets, TimePeriod } from 'src/app/types/api_types';
import { BinnedFeatures, Features } from 'src/app/types/crime_overview_types';
import { ApiService } from '../../../api.service';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @Input() center: LngLatLike | undefined;
  @Input() showDatasets: boolean = false;

  ONTARIO_TIMEZONE = 'America/Toronto'

  Datasets = Datasets;

  centerGeoJson: any = null;

  showFilter: boolean = false;
  minzoom: number = 0;

  title = 'client';
  selectedPoint: Feature<Point, GeoJsonProperties> | undefined = undefined;
  selectedData: Datasets | null = null;
  selectedOption: string | null = null;
  selectedTimePeriod: TimePeriod = TimePeriod.pastYear;

  allTimeCrimeData: Features = {} as Features;
  crimeData: Features = {} as Features;
  businessData: Features = {} as Features;
  allTimeBinnedCrimeData: BinnedFeatures = {} as BinnedFeatures;
  binnedCrimeData: BinnedFeatures = {} as BinnedFeatures;
  binnedBusinessData: BinnedFeatures = {} as BinnedFeatures;

  crimeTypes: string[] = []
  businessTypes: string[] = []

  binnedGeometry: BinnedFeatures = {} as BinnedFeatures
  geometry: Features = {} as Features;

  options: string[] = []
  timePeriodOptions: string[] = Object.values(TimePeriod)

  city: string | undefined = undefined

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
    });

    this.stateService.SelectedData.subscribe(dataset => {
      this.selectedData = dataset
      this.selectedOption = null;
      switch (this.selectedData) {
        case Datasets.business: {
          this.geometry = this.businessData;
          this.binnedGeometry = this.binnedBusinessData;
          this.options = this.businessTypes;
          break;
        }
        case Datasets.crime: {
          this.geometry = this.crimeData;
          this.binnedGeometry = this.binnedCrimeData;
          this.options = this.crimeTypes;
          break;
        }
      }

      if (!this.options.includes("Clear filter")) this.options.unshift("Clear filter")
    });
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
        this.allTimeCrimeData = data;
        this.allTimeBinnedCrimeData = this.transformer.binDataByType(data, "CrimeType")
        this.crimeTypes = Object.keys(this.allTimeBinnedCrimeData)
        this.filterTimePeriod();
      })
  }

  getBusinessData(id: string) {
    this.api.getBusinessGeoData(id)
      .subscribe(data => {
        this.businessData = data
        this.binnedBusinessData = this.transformer.binDataByType(data, "Category")
        this.businessTypes = Object.keys(this.binnedBusinessData)
      })
  }

  onClick(e: MapLayerMouseEvent) {
    this.selectedPoint = e?.features?.[0] as Feature<Point, GeoJsonProperties>;
  }

  onSelectCategory(option: string) {
    switch (this.selectedData) {
      case Datasets.business:
        this.binnedGeometry = this.binnedBusinessData;
        break;
      case Datasets.crime:
        this.binnedGeometry = this.binnedCrimeData;
        break;
    }

    if (option === "Clear filter") {
      this.selectedOption = null;
      if (this.selectedData === Datasets.business) {
        this.geometry = this.businessData;
      } else if (this.selectedData === Datasets.crime) {
        this.geometry = this.crimeData;
      }
    } else {
      this.geometry = this.binnedGeometry[option]
      this.selectedOption = option;
    }
  }

  onSelectTimePeriod(option: string) {
    this.selectedTimePeriod = <TimePeriod> option;
    this.filterTimePeriod();
    this.onSelectCategory(this.selectedOption ?? "Clear filter");
  }

  filterTimePeriod() {
    this.crimeData = Object.assign({}, this.allTimeCrimeData);
    this.binnedCrimeData = {}
    for (const [type, features] of Object.entries(this.allTimeBinnedCrimeData)) {
      this.binnedCrimeData[type] = Object.assign({}, features)
    }

    Object.assign({}, this.allTimeBinnedCrimeData);
    switch (this.selectedTimePeriod) {
      case TimePeriod.allTime:
        break;
      case TimePeriod.pastYear:
        this.filterByDate(DateTime.now().plus({ years: -1 }));
        break;
      case TimePeriod.pastSixMonths:
        this.filterByDate(DateTime.now().plus({ months: -6 }));
        break;
      case TimePeriod.pastMonth:
        this.filterByDate(DateTime.now().plus({ months: -1 }));
        break;
    }
  }

  filterByDate(thresholdDate: DateTime) {
    this.crimeData.features = this.crimeData.features.filter(feature => {
      return this.isFeatureLater(thresholdDate, feature);
    });

    for (const [type, featureCollection] of Object.entries(this.binnedCrimeData)) {
      featureCollection.features = featureCollection.features.filter(feature => {
        return this.isFeatureLater(thresholdDate, feature);
      });
      this.binnedCrimeData[type] = featureCollection;
    }
  }

  isFeatureLater(thresholdDate: DateTime, feature: Feature): boolean {
    // Timezone for crimes is hardcoded as Ontario until we expand
    // Format is different rn for Toronto and Waterloo

    if (!feature.properties) {
      return false;
    }

    if ('DateTime' in feature.properties!) {
      return DateTime.fromMillis(feature.properties['DateTime']) >= thresholdDate;
    }

    else {
      if (this.city === "Waterloo") {
        const featureDate = this.getDateWaterloo(feature);
        feature.properties!['DateTime'] = featureDate.toMillis();
        return featureDate >= thresholdDate;
      }
      else if (this.city === "Toronto") {
        const featureDate = this.getDateToronto(feature);
        feature.properties!['DateTime'] = featureDate.toMillis();
        return featureDate >= thresholdDate;
      }
      else {
        const waterlooFeatureDate = this.getDateWaterloo(feature);
        if (waterlooFeatureDate.isValid) {
          this.city = "Waterloo"
          feature.properties!['DateTime'] = waterlooFeatureDate.toMillis();
          return waterlooFeatureDate >= thresholdDate;
        }

        const torontoFeatureDate = this.getDateToronto(feature);
        if (torontoFeatureDate.isValid) {
          this.city = "Toronto"
          feature.properties!['DateTime'] = torontoFeatureDate.toMillis();
          return torontoFeatureDate >= thresholdDate;
        }

        return true;
      }
    }
  }

  getDateWaterloo(feature: Feature): DateTime {
    return DateTime.fromFormat(feature.properties?.['ReportedDateAndTime'],
                               "d/M/yyyy H:mm",
                               { zone: this.ONTARIO_TIMEZONE });
  }

  getDateToronto(feature: Feature): DateTime {
    return DateTime.fromFormat(feature.properties?.['ReportedDateAndTime'],
                               "yyyy-MM-dd",
                               { zone: this.ONTARIO_TIMEZONE });
  }
}
