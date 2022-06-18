import { Component, Input, OnInit } from '@angular/core';
import { StateService } from 'src/app/services/state/state.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  

  constructor(private stateService: StateService) { }

  ngOnInit(): void {
  }

  onClick() {
    window.location.reload();
  }

}
