import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { StateService } from 'src/app/services/state/state.service';
import { Datasets } from 'src/app/types/api_types';

@Component({
  selector: 'app-datasets',
  templateUrl: './datasets.component.html',
  styleUrls: ['./datasets.component.css']
})
export class DatasetsComponent implements OnInit {

  options: Datasets[] = []
  selectedData: Datasets | null = Datasets.crime;

  constructor(private stateService: StateService) {
    stateService.SelectedListing.subscribe(listing => {
      let options = [];

      if (listing.crime_geodata_id !== "") options.push(Datasets.crime)
      if (listing.business_geodata_id !== "") options.push(Datasets.business)

      this.options = options;
    })
  }

  ngOnInit(): void {
    this.stateService.SelectedData.next(Datasets.crime)
  }


  onClick(dataset: Datasets): void {
    this.stateService.SelectedData.next(dataset)
    this.selectedData = dataset;
  }

}
