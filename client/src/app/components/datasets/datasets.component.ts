import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { StateService } from 'src/app/services/state/state.service';
import { Datasets } from 'src/app/types/api_types';

@Component({
  selector: 'app-datasets',
  templateUrl: './datasets.component.html',
  styleUrls: ['./datasets.component.css']
})
export class DatasetsComponent {

  options: Datasets[] = [
    Datasets.business,
    Datasets.crime
  ]
  selectedData: Datasets | null = null;

  constructor(private stateService: StateService) {}


  onClick(dataset: Datasets): void {
    this.stateService.SelectedData.next(dataset)
    this.selectedData = dataset;
  }

}
