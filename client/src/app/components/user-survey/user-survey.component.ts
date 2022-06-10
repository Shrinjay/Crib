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
    email: new FormControl('')
  });

  constructor(private dialogRef: MatDialogRef<UserSurveyComponent>) { }

  ngOnInit(): void {
    this.surveyForm.get('willingToInterview')!.valueChanges
      .subscribe(value => {
        if (value) {
          this.surveyForm.get('email')!.setValidators([Validators.required, Validators.email])
        } else {
          this.surveyForm.get('email')!.setValidators([Validators.email]);
        }
        this.surveyForm.controls['email'].updateValueAndValidity();
      });
  }

  submit() {
    this.dialogRef.close();
  }
}
