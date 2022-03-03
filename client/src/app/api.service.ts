import { Injectable } from '@angular/core';
import { CrimeMetrics, GenerateMetricsRequest, Listing } from './types/api_types';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { FeatureCollection, Point, GeoJsonProperties } from 'geojson';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  base_url: string = environment.base_url;
  data_base_url: string = environment.data_base_url;
  constructor(private http: HttpClient) { }

  getListings(): Observable<{ [id: string]: Listing }> {
    return this.http.get<{ [id: string]: Listing }>(`${this.base_url}/listings`);
  }

  getCrimeGeoData(id: string): Observable<FeatureCollection<Point, GeoJsonProperties>> {
    return this.http.get<FeatureCollection<Point, GeoJsonProperties>>(`${this.base_url}/crime_data/${id}.json`);
  }

  getCrimeMetrics(id: string): Observable<CrimeMetrics> {
    return this.http.get<CrimeMetrics>(`${this.base_url}/crime_metrics/${id}.json`)
  }

  generateCrimeMetrics(request: GenerateMetricsRequest): Observable<boolean> {
    return this.http.get<boolean>(`${this.data_base_url}/insights_from_request?name=${request.name}&lat=${request.lattitude}&lon=${request.longitude}`)
  }
}
