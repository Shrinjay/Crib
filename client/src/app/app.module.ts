import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { HttpClientModule } from '@angular/common/http';
import { MapComponent } from './components/map/map/map.component';
import { MapPopupComponent } from './components/map/popup/map-popup/map-popup.component';
import { ListingsComponent } from './components/listings/listings/listings.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../environments/environment';
import { ToolbarComponent } from './components/toolbar/toolbar/toolbar.component';
import { CrimeOverviewComponent } from './components/crime-overview/crime-overview.component';
import { CrimeCardComponent } from './components/crime-overview/crime-card/crime-card.component';
import { RequestComponent } from './components/request/request.component';
import { DatasetsComponent } from './components/datasets/datasets.component';
import { SearchComponent } from './components/search/search.component';
import { CityBlockComponent } from './components/search/city-block/city-block.component';
import { BusinessCardComponent } from './components/crime-overview/business-card/business-card.component';
import { AbsPipe } from './pipes/abs.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    MapPopupComponent,
    ListingsComponent,
    ToolbarComponent,
    CrimeOverviewComponent,
    CrimeCardComponent,
    RequestComponent,
    DatasetsComponent,
    SearchComponent,
    CityBlockComponent,
    BusinessCardComponent,
    AbsPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxMapboxGLModule.withConfig({
      accessToken: environment.mapbox_key as string
    }),
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
