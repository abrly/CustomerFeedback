import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FeedbackService } from './feedback.service';

import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-feedback',
  imports: [CommonModule, ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,    
    MatIconModule,
    MatSelectModule,
    MatButtonModule
  ],
  providers: [FeedbackService], // ✅ This line is crucial
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.scss'
})
export class FeedbackComponent {

  feedbackForm: FormGroup;
  successMsg = '';
  errorMsg = '';

  constructor(private fb: FormBuilder, private feedbackService: FeedbackService) {
    this.feedbackForm = this.fb.group({
      ContNo: ['', [Validators.required]],
      Remarks: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      serviceType: ['', Validators.required],
      feedbackType: ['', Validators.required],
      feedbackText: ['', [Validators.required]],
    });
  }

  onSubmit() {
    console.log(`ht`);
    this.successMsg = '';
    this.errorMsg = '';

    if (this.feedbackForm.invalid) {
      this.errorMsg = 'Please fill in all required fields correctly.';
      return;
    }

    this.feedbackService.sendFeedback(this.feedbackForm.value).subscribe({
      next: () => {
        this.successMsg = 'Thank you! Your feedback has been submitted.';
        this.feedbackForm.reset();
      },
      error: (err) => {
        console.error(err);
        this.errorMsg = 'Submission failed. Please try again.';
      },
    });
  }

}
