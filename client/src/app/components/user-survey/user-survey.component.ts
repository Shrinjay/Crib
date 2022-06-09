import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-survey',
  templateUrl: './user-survey.component.html',
  styleUrls: ['./user-survey.component.css']
})
export class UserSurveyComponent implements OnInit {
  surveyForm = new FormGroup({
    enjoyementRating: new FormControl(null, Validators.required),
    recommendationRating: new FormControl(null, Validators.required),
    maxPricePerListing: new FormControl('', Validators.required),
    maxPricePerMonth: new FormControl('', Validators.required),
    willingToInterview: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required)
  });

  constructor(private dialogRef: MatDialogRef<UserSurveyComponent>) { }

  ngOnInit(): void {
  }

  submit() {
    this.dialogRef.close();
  }
}
