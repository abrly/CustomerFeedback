import { Component, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormGroupDirective } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FeedbackService } from './feedback.service';

import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

import { MatDividerModule } from '@angular/material/divider';

import { TranslateService } from '@ngx-translate/core';

import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-feedback',
  imports: [CommonModule, ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,    
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
    MatDividerModule,
    TranslateModule,   // ✅ IMPORTANT
  ],
  providers: [FeedbackService], // ✅ This line is crucial
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.scss'
})
export class FeedbackComponent {

  @ViewChild(FormGroupDirective) formDirective!: FormGroupDirective;

  currentLang = 'ar';

  feedbackForm: FormGroup;
  successMsg = '';
  errorMsg = '';

  isArabic = true;

  constructor(private fb: FormBuilder, private feedbackService: FeedbackService,private translate: TranslateService) {

    
    translate.addLangs(['en', 'ar']);

    translate.setDefaultLang('ar');
  
   // const browserLang = translate.getBrowserLang() ?? 'ar';

    const browserLang = 'ar';

    translate.use(browserLang.match(/en|ar/) ? browserLang : 'ar');

    //this.isArabic = this.translate.currentLang === 'ar';

    this.isArabic = true;

    document.documentElement.dir = this.isArabic ? 'rtl' : 'ltr';

    console.log(`what is default lang ${document.documentElement.dir}`);

    
    this.feedbackForm = this.fb.group({
      ContNo: ['', [Validators.required]],
      Remarks: ['', [Validators.email]],
      name: ['', [Validators.required]],
      serviceType: ['', Validators.required],
      feedbackType: ['', Validators.required],
      feedbackText: ['', [Validators.required]],
    });

  
  }

  toggleLanguage(): void {

    this.currentLang = this.currentLang === 'en' ? 'ar' : 'en';
    this.translate.use(this.currentLang);
    this.isArabic = this.currentLang === 'ar';
  
    // Optional: Update <html> tag direction for the whole document
    document.documentElement.dir = this.isArabic ? 'rtl' : 'ltr';

    this.successMsg = '';
    this.errorMsg = '';

    this.feedbackForm.reset();
    this.feedbackForm.markAsPristine();
    this.feedbackForm.markAsUntouched();
    this.feedbackForm.updateValueAndValidity(); 

    Object.keys(this.feedbackForm.controls).forEach(key => {
      this.feedbackForm.get(key)?.reset();
      this.feedbackForm.get(key)?.markAsPristine();
      this.feedbackForm.get(key)?.markAsUntouched();
    });

    this.formDirective.resetForm();



  }
  

  onSubmit() {
    console.log(`ht`);
    this.successMsg = '';
    this.errorMsg = '';

    if (this.feedbackForm.invalid) {


      this.translate.get('FEEDBACK.FILL').subscribe((res: string) => {
        this.errorMsg = res; // This will be localized based on the current language
      });
      
      
     // this.errorMsg = 'Please fill in all required fields correctly.';


      return;
    }

    this.feedbackService.sendFeedback(this.feedbackForm.value).subscribe({
      next: () => {

        this.translate.get('FEEDBACK.SUCCESS').subscribe((res: string) => {
          this.successMsg = res; // This will be localized based on the current language
        });

       // this.successMsg = 'Thank you! Your feedback has been submitted.';

        this.feedbackForm.reset();
        this.feedbackForm.markAsPristine();
        this.feedbackForm.markAsUntouched();
        this.feedbackForm.updateValueAndValidity(); 

        Object.keys(this.feedbackForm.controls).forEach(key => {
          this.feedbackForm.get(key)?.reset();
          this.feedbackForm.get(key)?.markAsPristine();
          this.feedbackForm.get(key)?.markAsUntouched();
        });

        this.formDirective.resetForm();

      },
      error: (err) => {
        console.error(err);

        this.translate.get('FEEDBACK.FAILURE').subscribe((res: string) => {
          this.errorMsg = res; // This will be localized based on the current language
        });

        // this.errorMsg = 'Submission failed. Please try again.';
      },
    });
  }

}
