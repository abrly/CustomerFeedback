// src/app/services/feedback.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Feedback {
  ContNo: string;
  Remarks: string;
  name: string;
  feedbackText: string;
}

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {

  private apiUrl = 'http://localhost:3000/feedback'; // Change if backend hosted elsewhere

  constructor(private http: HttpClient) {}

  sendFeedback(feedback: Feedback): Observable<any> {
    return this.http.post(this.apiUrl, feedback);
  }
  
}
