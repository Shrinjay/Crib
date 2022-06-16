import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../api.service';
import { GetIpService } from '../../ip-service.service';
import { SurveyResponse } from '../../types/api_types';

@Component({
  selector: 'app-user-survey',
  templateUrl: './user-survey.component.html',
  styleUrls: ['./user-survey.component.css']
})
export class UserSurveyComponent implements OnInit {
  initalNumber: number | undefined = undefined
  initialBool: boolean | undefined = undefined
  surveyForm = new FormGroup({
    enjoyementRating: new FormControl(this.initalNumber, Validators.required),
    recommendationRating: new FormControl(this.initalNumber, Validators.required),
    maxPricePerListing: new FormControl('', Validators.required),
    maxPricePerMonth: new FormControl('', Validators.required),
    willingToBeInterviewed: new FormControl(this.initialBool, Validators.required),
    email: new FormControl('')
  });

  constructor(
    private dialogRef: MatDialogRef<UserSurveyComponent>,
    private getIpService: GetIpService,
    private api: ApiService) { }

  ngOnInit(): void {
    this.surveyForm.get('willingToBeInterviewed')!.valueChanges
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
    let value = this.surveyForm.value
    var surveyResponse = {
      enjoyementRating: value.enjoyementRating!,
      recommendationRating: value.recommendationRating!,
      maxPricePerListing: value.maxPricePerListing!,
      maxPricePerMonth: value.maxPricePerMonth!,
      willingToBeInterviewed: value.willingToBeInterviewed!,
      email: value.email!
    };

    this.getIpService.getIpAddress().subscribe(response =>
      this.api.addUserSurveyResponse(response.ip, surveyResponse).subscribe()
    );

    this.dialogRef.close();
  }
    
}
