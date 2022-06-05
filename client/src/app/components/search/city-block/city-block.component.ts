import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-city-block',
  templateUrl: './city-block.component.html',
  styleUrls: ['./city-block.component.css']
})
export class CityBlockComponent implements OnInit {
  @Input() city: string | null = null;
  @Input() city_picture: string | null = null;
  @Input() selected_city: string | null = null;
  @Input() hover_city: string | null = null;

  constructor() { }

  ngOnInit(): void {
  }

}
